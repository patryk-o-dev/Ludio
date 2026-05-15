import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerService } from '../player/player.service';

@Injectable()
export class GameService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly playerService: PlayerService,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: {
        selectedChips: {
          create: createGameDto.chips.map((chip) => ({
            chipGuessId: chip.chipGuessId,
            chipById: chip.chipById,
          })),
        },
      },
      include: {
        selectedChips: true,
      },
    });
  }

  findAll() {
    return this.prisma.game.findMany();
  }

  findOne(id: string) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.game.delete({ where: { id } });
  }

  async getAnswersForCurrentQuestion(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { currentQuestion: true },
    });
    if (!game) throw new NotFoundException(`Game #${id} not found`);
    if (!game.currentQuestion) {
      throw new NotFoundException('Game has no current question');
    }

    return this.prisma.answer.findMany({
      where: { answerType: game.currentQuestion.answerType },
    });
  }

  async nextQuestion(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { selectedChips: true },
    });
    if (!game) throw new NotFoundException(`Game #${id} not found`);

    // Collect candidate question IDs matching ALL chip pairs (chipGuessId AND chipById together)
    const questionIdSets = await Promise.all(
      game.selectedChips.map((sc) =>
        this.prisma.question
          .findMany({
            where: {
              alreadyAsked: false,
              chipsGuess: { some: { id: sc.chipGuessId } },
              chipsBy: { some: { id: sc.chipById } },
            },
            select: { id: true },
          })
          .then((qs) => qs.map((q) => q.id)),
      ),
    );

    const uniqueIds = [...new Set(questionIdSets.flat())];
    const questions = await this.prisma.question.findMany({
      where: { id: { in: uniqueIds } },
    });

    if (questions.length === 0) {
      throw new NotFoundException('No available questions for this game');
    }

    const picked = questions[Math.floor(Math.random() * questions.length)];

    await this.prisma.question.update({
      where: { id: picked.id },
      data: { alreadyAsked: true },
    });

    return this.prisma.game.update({
      where: { id },
      data: { currentQuestionId: picked.id },
      include: { currentQuestion: { include: { media: true } } },
    });
  }

  async checkAnswer(
    id: string,
    value: string,
  ): Promise<{
    correct: boolean;
    score: number;
    lives: number;
    status: 'win' | 'lose' | 'ongoing';
  }> {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { currentQuestion: { include: { answer: true } } },
    });
    if (!game) throw new NotFoundException(`Game #${id} not found`);
    if (!game.currentQuestion) {
      throw new NotFoundException('Game has no current question');
    }

    const correct =
      game.currentQuestion.answer.value.trim().toLowerCase() ===
      value.trim().toLowerCase();

    const updated = await this.prisma.game.update({
      where: { id },
      data: correct ? { score: { increment: 1 } } : { lives: { decrement: 1 } },
    });

    let status: 'win' | 'lose' | 'ongoing' = 'ongoing';
    if (updated.score >= 5) status = 'win';
    else if (updated.lives <= 0) status = 'lose';

    if (status === 'win') {
      await this.playerService.addExp(20);

      const gameWithChips = await this.prisma.game.findUnique({
        where: { id },
        include: { selectedChips: true },
      });
      const chipByIds = [
        ...new Set(gameWithChips!.selectedChips.map((sc) => sc.chipById)),
      ];
      await this.prisma.chipBy.updateMany({
        where: { id: { in: chipByIds } },
        data: { lvl: { increment: 1 } },
      });
    }

    return { correct, score: updated.score, lives: updated.lives, status };
  }
}
