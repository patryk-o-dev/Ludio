import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSessionGateway } from './game-session/game-session.gateway';
import { RedisService } from '@/redis/redis.service';

type ActiveSession = {
  currentQuestionId: string;
  answeredUserIds: Set<string>;
  timeoutHandle: ReturnType<typeof setTimeout> | null;
  totalPlayers: number;
};

type UiSessionStatus = 'WAITING' | 'ACTIVE' | 'FINISHED';
type SessionPhase = 'waiting' | 'question' | 'summary' | 'completed';

type SessionAnswerOption = {
  id: string;
  value: string;
};

type SessionQuestionPayload = {
  id: string;
  url: string;
  answers: SessionAnswerOption[];
  correctAnswer: SessionAnswerOption;
};

type SessionLiveState = {
  phase: SessionPhase;
  question: SessionQuestionPayload | null;
  questionId: string | null;
  qIndex: number;
  currentRuleIndex: number;
  startedAt: number | null;
  expiresAt: number | null;
  summaryEndsAt: number | null;
  timeLimitSeconds: number | null;
  answeredUserIds: string[];
};

@Injectable()
export class GameSessionService {
  private readonly activeSessions = new Map<string, ActiveSession>();
  private readonly runningSessionLoops = new Set<string>();
  private readonly logger = new Logger(GameSessionService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => GameSessionGateway))
    private readonly gateway: GameSessionGateway,
    private readonly redisService: RedisService,
  ) {}

  private async withSessionLoopLock(
    sessionId: string,
    routine: () => Promise<void>,
  ) {
    if (this.runningSessionLoops.has(sessionId)) {
      this.logger.warn(
        `Quiz loop for session ${sessionId} is already running. Skipping duplicate start request`,
      );
      return;
    }

    this.runningSessionLoops.add(sessionId);

    try {
      await routine();
    } finally {
      this.runningSessionLoops.delete(sessionId);
    }
  }

  private getStateKey(sessionId: string) {
    return `game-session:${sessionId}:state`;
  }

  private async getStoredState(sessionId: string) {
    return this.redisService.getJson<SessionLiveState>(
      this.getStateKey(sessionId),
    );
  }

  private async setStoredState(sessionId: string, state: SessionLiveState) {
    await this.redisService.setJson(
      this.getStateKey(sessionId),
      state,
      60 * 60,
    );
  }

  private async clearStoredState(sessionId: string) {
    await this.redisService.del(this.getStateKey(sessionId));
  }

  private toUiStatus(
    status: 'NotStarted' | 'InProgress' | 'Completed',
  ): UiSessionStatus {
    switch (status) {
      case 'NotStarted':
        return 'WAITING';
      case 'InProgress':
        return 'ACTIVE';
      case 'Completed':
        return 'FINISHED';
    }
  }

  private shuffleArray<T>(items: T[]) {
    const next = [...items];
    for (let index = next.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
    }
    return next;
  }

  async create(dto: CreateGameSessionDto) {
    const gameConfig = await this.prisma.gameConfig.findUnique({
      where: { id: dto.gameConfigId },
      include: { rules: true, options: true },
    });
    if (!gameConfig) {
      throw new NotFoundException('Game configuration not found or invalid');
    }

    const players = await this.prisma.user.findMany({
      where: { id: { in: ['1'] } },
    });
    if (players.length !== dto.playerIds.length) {
      throw new BadRequestException('One or more players are invalid');
    }

    const session = await this.prisma.gameSession.create({
      data: {
        gameConfigId: dto.gameConfigId,
        players: {
          create: dto.playerIds.map((userId) => ({ userId })),
        },
      },
      include: {
        gameConfig: {
          include: { rules: true, options: true },
        },
        players: true,
      },
    });

    return session;
  }

  async findOne(id: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id },
      include: {
        gameConfig: {
          include: { rules: true, options: true },
        },
        players: true,
      },
    });
    if (!session) {
      throw new NotFoundException('Game session not found');
    }
    return session;
  }

  async findState(id: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id },
      include: {
        gameConfig: {
          include: {
            rules: true,
            options: true,
          },
        },
        players: true,
      },
    });
    if (!session) {
      throw new NotFoundException('Game session not found');
    }

    const questionLimit = session.gameConfig.options?.questionLimit ?? 0;
    const live = await this.getStoredState(id);
    const currentRuleIndex =
      live?.currentRuleIndex ??
      (session.gameConfig.rules.length > 0 && questionLimit > 0
        ? Math.floor(Math.max(session.qIndex - 1, 0) / questionLimit) %
          session.gameConfig.rules.length
        : 0);

    return {
      id: session.id,
      status: this.toUiStatus(session.status),
      currentRuleIndex,
      rulePools: session.gameConfig.rules.map((rule, ruleIndex) => {
        const questionsDrawnForRule =
          questionLimit > 0
            ? Math.max(
                0,
                Math.min(
                  session.qIndex - ruleIndex * questionLimit,
                  questionLimit,
                ),
              )
            : 0;

        return {
          id: rule.id,
          ruleId: rule.id,
          ruleIndex,
          questionCount: questionLimit,
          drawnCount: questionsDrawnForRule,
          _count: { candidates: 0 },
        };
      }),
      players: session.players,
      live:
        live ??
        ({
          phase: session.status === 'Completed' ? 'completed' : 'waiting',
          question: null,
          questionId: null,
          qIndex: session.qIndex,
          currentRuleIndex,
          startedAt: null,
          expiresAt: null,
          summaryEndsAt: null,
          timeLimitSeconds: null,
          answeredUserIds: [],
        } satisfies SessionLiveState),
    };
  }

  async acceptInvitation(sessionId: string, userId: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { players: true },
    });
    if (!session) {
      throw new NotFoundException('Game session not found');
    }

    const isPlayer = session.players.some((p) => p.userId === userId);
    if (!isPlayer) {
      throw new BadRequestException('User is not invited to this session');
    }

    await this.prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        players: {
          update: {
            where: {
              gameSessionId_userId: {
                gameSessionId: sessionId,
                userId: userId,
              },
            },
            data: { status: 'Accepted' },
          },
        },
      },
    });

    const updatedSession = await this.prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { players: true },
    });

    if (updatedSession.players.every((p) => p.status === 'Accepted')) {
      await this.prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: 'InProgress' },
      });
      await this.prisma.gameSessionPlayer.updateMany({
        where: { gameSessionId: sessionId },
        data: { status: 'Answering' },
      });

      this.gateway.server.to(sessionId).emit('session:ready', { sessionId });
      await this.startQuizLoop(sessionId);
    }
    return this.findOne(sessionId);
  }

  async submitAnswer(
    sessionId: string,
    userId: string,
    answerId: string,
    timeMs: number,
  ) {
    const liveState = await this.getStoredState(sessionId);
    const activeSession = this.activeSessions.get(sessionId);
    if (
      !liveState ||
      liveState.phase !== 'question' ||
      !liveState.questionId ||
      !activeSession ||
      activeSession.answeredUserIds.has(userId)
    ) {
      this.logger.warn(
        `Ignoring answer for session ${sessionId}, user ${userId}. live=${Boolean(liveState)}, phase=${liveState?.phase ?? 'none'}, questionId=${liveState?.questionId ?? 'none'}, activeSession=${Boolean(activeSession)}, alreadyAnswered=${activeSession?.answeredUserIds.has(userId) ?? false}`,
      );
      return;
    }

    if (liveState.expiresAt !== null && Date.now() > liveState.expiresAt) {
      this.logger.warn(
        `Ignoring expired answer for session ${sessionId}, user ${userId}`,
      );
      return;
    }

    const question = await this.prisma.question.findUnique({
      where: { id: liveState.questionId },
    });
    if (!question) {
      this.logger.warn(
        `Question ${liveState.questionId} not found for session ${sessionId}`,
      );
      return;
    }

    const correct = question.answerId === answerId;
    const points = correct ? 1 : 0;

    await this.prisma.gameSessionPlayer.update({
      where: {
        gameSessionId_userId: { gameSessionId: sessionId, userId },
      },
      data: {
        score: { increment: points },
        timeMs: { increment: timeMs },
      },
    });

    activeSession.answeredUserIds.add(userId);
    await this.setStoredState(sessionId, {
      ...liveState,
      answeredUserIds: [...activeSession.answeredUserIds],
    });

    this.gateway.server.to(sessionId).emit('session:player-answered', {
      userId,
      correct,
      points,
    });

    if (activeSession.answeredUserIds.size >= activeSession.totalPlayers) {
      if (activeSession.timeoutHandle) {
        clearTimeout(activeSession.timeoutHandle);
        activeSession.timeoutHandle = null;
      }
      await this.finishQuestion(sessionId, 3);
    }
  }

  private async startQuizLoop(sessionId: string) {
    await this.withSessionLoopLock(sessionId, async () => {
      const session = await this.prisma.gameSession.findUnique({
        where: { id: sessionId },
        include: {
          gameConfig: {
            include: {
              rules: {
                include: {
                  chipFilters: true,
                },
              },
              options: true,
            },
          },
          players: true,
          usedQuestions: true,
        },
      });
      if (!session) {
        throw new NotFoundException('Game session not found');
      }

      const qIndex = session.qIndex || 0;
      const questionsPerRule = session.gameConfig.options.questionLimit;
      const timeLimitSeconds = session.gameConfig.options.timeLimitSeconds;
      const totalRules = session.gameConfig.rules.length;
      const totalQuestions = questionsPerRule * totalRules;

      if (qIndex >= totalQuestions) {
        await this.endGame(sessionId);
        return;
      }

      const currentRuleIndex =
        Math.floor(qIndex / questionsPerRule) % totalRules;
      const usedIds = session.usedQuestions.map((q) => q.id);
      const summaryTimeSeconds = 10;
      const currentRule = session.gameConfig.rules[currentRuleIndex];
      const filterIds = currentRule.chipFilters.map((f) => f.id);

      let questions = await this.prisma.question.findMany({
        where: {
          id: {
            notIn: usedIds,
          },
          chipGuesses: {
            some: {
              id: currentRule.chipGuessId,
            },
          },
          difficulty: session.gameConfig.options.difficulty,
          chipBy: {
            id: currentRule.chipById,
          },
          ...(filterIds.length > 0 && {
            chipFilters: {
              some: {
                id: {
                  in: filterIds,
                },
              },
            },
          }),
        },
      });

      if (!questions.length) {
        if (usedIds.length > 0) {
          this.logger.warn(
            `No unused questions left for session ${sessionId}. Resetting usedQuestions and retrying within the same lock`,
          );

          await this.prisma.gameSession.update({
            where: { id: sessionId },
            data: {
              usedQuestions: {
                set: [],
              },
            },
          });

          questions = await this.prisma.question.findMany({
            where: {
              chipGuesses: {
                some: {
                  id: currentRule.chipGuessId,
                },
              },
              difficulty: session.gameConfig.options.difficulty,
              chipBy: {
                id: currentRule.chipById,
              },
              ...(filterIds.length > 0 && {
                chipFilters: {
                  some: {
                    id: {
                      in: filterIds,
                    },
                  },
                },
              }),
            },
          });
        }

        if (!questions.length) {
          this.logger.warn(
            `No questions matched session ${sessionId} ruleIndex=${currentRuleIndex}. Session will stay active without starting a question until the rule/config is fixed`,
          );
          return;
        }
      }

      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

      const possibleAnswers = await this.prisma.answer.findMany({
        where: {
          chipGuesses: {
            some: {
              id: currentRule.chipGuessId,
            },
          },
          ...(filterIds.length > 0 && {
            chipFilters: {
              some: {
                id: {
                  in: filterIds,
                },
              },
            },
          }),
        },
        select: {
          id: true,
          value: true,
        },
      });

      const correctAnswer =
        possibleAnswers.find(
          (answer) => answer.id === randomQuestion.answerId,
        ) ??
        (await this.prisma.answer.findUnique({
          where: { id: randomQuestion.answerId },
          select: { id: true, value: true },
        }));

      if (!correctAnswer) {
        this.logger.error(
          `Missing correct answer ${randomQuestion.answerId} for question ${randomQuestion.id} in session ${sessionId}`,
        );
        throw new NotFoundException('Question answer not found');
      }

      const answerOptions = this.shuffleArray([
        correctAnswer,
        ...this.shuffleArray(
          possibleAnswers.filter((answer) => answer.id !== correctAnswer.id),
        ).slice(0, 7),
      ]);

      await this.prisma.gameSession.update({
        where: { id: sessionId },
        data: {
          qIndex: {
            increment: 1,
          },
          usedQuestions: {
            connect: {
              id: randomQuestion.id,
            },
          },
        },
      });

      const startedAt = Date.now();
      const expiresAt =
        timeLimitSeconds === null || timeLimitSeconds === undefined
          ? null
          : startedAt + timeLimitSeconds * 1000;

      const liveState: SessionLiveState = {
        phase: 'question',
        question: {
          id: randomQuestion.id,
          url: randomQuestion.url,
          answers: answerOptions,
          correctAnswer,
        },
        questionId: randomQuestion.id,
        qIndex: qIndex + 1,
        currentRuleIndex,
        startedAt,
        expiresAt,
        summaryEndsAt: null,
        timeLimitSeconds: timeLimitSeconds ?? null,
        answeredUserIds: [],
      };

      await this.setStoredState(sessionId, liveState);

      this.activeSessions.set(sessionId, {
        currentQuestionId: randomQuestion.id,
        answeredUserIds: new Set(),
        timeoutHandle: null,
        totalPlayers: session.players.length,
      });

      const activeEntry = this.activeSessions.get(sessionId)!;

      if (timeLimitSeconds !== null && timeLimitSeconds !== undefined) {
        activeEntry.timeoutHandle = setTimeout(async () => {
          await this.finishQuestion(sessionId, summaryTimeSeconds);
        }, timeLimitSeconds * 1000);
      }

      this.gateway.server.to(sessionId).emit('session:question', liveState);
    });
  }

  private async finishQuestion(sessionId: string, summaryTimeSeconds: number) {
    const liveState = await this.getStoredState(sessionId);
    if (!liveState) {
      return;
    }

    const summaryState: SessionLiveState = {
      ...liveState,
      phase: 'summary',
      expiresAt: null,
      summaryEndsAt: Date.now() + summaryTimeSeconds * 1000,
    };

    await this.setStoredState(sessionId, summaryState);

    this.gateway.server.to(sessionId).emit('session:summary', summaryState);

    setTimeout(async () => {
      await this.startQuizLoop(sessionId);
    }, summaryTimeSeconds * 1000);
  }

  private async endGame(sessionId: string) {
    this.activeSessions.delete(sessionId);
    await this.clearStoredState(sessionId);

    const players = await this.prisma.gameSessionPlayer.findMany({
      where: { gameSessionId: sessionId },
      orderBy: [{ score: 'desc' }, { timeMs: 'asc' }],
    });

    await Promise.all(
      players.map((player, index) =>
        this.prisma.gameSessionPlayer.update({
          where: {
            gameSessionId_userId: {
              gameSessionId: sessionId,
              userId: player.userId,
            },
          },
          data: { rank: index + 1 },
        }),
      ),
    );

    await this.prisma.gameSession.update({
      where: { id: sessionId },
      data: { status: 'Completed' },
    });

    const rankings = players.map((p, index) => ({
      userId: p.userId,
      rank: index + 1,
      score: p.score,
      timeMs: p.timeMs,
    }));

    const completedState: SessionLiveState = {
      phase: 'completed',
      question: null,
      questionId: null,
      qIndex: 0,
      currentRuleIndex: 0,
      startedAt: null,
      expiresAt: null,
      summaryEndsAt: null,
      timeLimitSeconds: null,
      answeredUserIds: [],
    };

    await this.setStoredState(sessionId, completedState);

    this.gateway.server
      .to(sessionId)
      .emit('session:completed', { sessionId, rankings, live: completedState });
  }
}
