import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSessionGateway } from './game-session/game-session.gateway';
import { REDLOCK } from '@/redis/redis.module';

type RedlockUsing = {
  using<T>(
    resources: string[],
    duration: number,
    routine: (signal: unknown) => Promise<T>,
  ): Promise<T>;
};

type ActiveSession = {
  currentQuestionId: string;
  answeredUserIds: Set<string>;
  timeoutHandle: ReturnType<typeof setTimeout> | null;
  totalPlayers: number;
};

@Injectable()
export class GameSessionService {
  private readonly activeSessions = new Map<string, ActiveSession>();

  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => GameSessionGateway))
    private readonly gateway: GameSessionGateway,
    @Inject(REDLOCK) private readonly redlock: RedlockUsing,
  ) {}

  async create(dto: CreateGameSessionDto) {
    const gameConfig = await this.prisma.gameConfig.findUnique({
      where: { id: dto.gameConfigId },
      include: { rules: true, options: true },
    });
    if (!gameConfig) {
      throw new NotFoundException('Game configuration not found or invalid');
    }

    const players = await this.prisma.user.findMany({
      where: { id: { in: dto.playerIds } },
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
    const activeSession = this.activeSessions.get(sessionId);
    if (!activeSession || activeSession.answeredUserIds.has(userId)) return;

    const question = await this.prisma.question.findUnique({
      where: { id: activeSession.currentQuestionId },
    });
    if (!question) return;

    const correct = question.answerId === answerId;
    const points = correct ? Math.max(100, 1000 - Math.floor(timeMs / 100)) : 0;

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
    await this.redlock.using([`quiz:${sessionId}`], 5000, async () => {
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
      const currentRuleIndex =
        Math.floor(qIndex / questionsPerRule) % totalRules;
      const usedIds = session.usedQuestions.map((q) => q.id);
      const summaryTimeSeconds = 3;
      const totalQuestions = questionsPerRule * totalRules;
      const currentRule = session.gameConfig.rules[currentRuleIndex];
      const filterIds = currentRule.chipFilters.map((f) => f.id);

      const questions = await this.prisma.question.findMany({
        where: {
          id: {
            notIn: usedIds,
          },
          chipGuesses: {
            some: {
              id: currentRule.chipGuessId,
            },
          },
          chipBys: {
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
        await this.prisma.gameSession.update({
          where: { id: sessionId },
          data: {
            usedQuestions: {
              set: [],
            },
          },
        });
        await this.startQuizLoop(sessionId);
        return;
      }

      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

      if (qIndex >= totalQuestions) {
        await this.endGame(sessionId);
        return;
      }

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

      const { answerId: _, ...questionForClient } = randomQuestion;

      this.activeSessions.set(sessionId, {
        currentQuestionId: randomQuestion.id,
        answeredUserIds: new Set(),
        timeoutHandle: null,
        totalPlayers: session.players.length,
      });

      const activeEntry = this.activeSessions.get(sessionId)!;
      activeEntry.timeoutHandle = setTimeout(
        async () => {
          await this.finishQuestion(sessionId, summaryTimeSeconds);
        },
        (timeLimitSeconds ?? 30) * 1000,
      );

      this.gateway.server.to(sessionId).emit('session:question', {
        question: questionForClient,
        timeLimitSeconds,
      });
    });
  }

  private async finishQuestion(sessionId: string, summaryTimeSeconds: number) {
    this.gateway.server.to(sessionId).emit('session:summary');

    setTimeout(async () => {
      await this.startQuizLoop(sessionId);
    }, summaryTimeSeconds * 1000);
  }

  private async endGame(sessionId: string) {
    this.activeSessions.delete(sessionId);

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

    this.gateway.server
      .to(sessionId)
      .emit('session:completed', { sessionId, rankings });
  }
}
