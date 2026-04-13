import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SetService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.set.findMany({
      include: {
        guess: {
          include: {
            category: true,
          },
        },
        by: {
          include: {
            category: true,
          },
        },
        only: {
          include: {
            category: true,
          },
        },
        without: {
          include: {
            category: true,
          },
        },
        option: true,
      },
    });
  }

  findSelected() {
    return this.prisma.set.findFirst({
      where: { selected: true },
      include: {
        guess: true,
        by: true,
        only: true,
        without: true,
        option: true,
      },
    });
  }

  async selectSet(setId: string) {
    await this.prisma.set.updateMany({
      where: {},
      data: { selected: false },
    });

    await this.prisma.set.update({
      where: { id: setId },
      data: { selected: true },
    });

    return await this.prisma.set.findUnique({
      where: { id: setId },
      include: {
        guess: true,
        by: true,
        only: true,
        without: true,
        option: true,
      },
    });
  }

  async winCondition() {
    const selectedSet = await this.prisma.set.findFirst({
      where: { selected: true },
      include: {
        option: true,
      },
    });
    if (!selectedSet) return { message: 'No set selected' };
    const player = await this.prisma.player.findFirst();
    if (!player) return { message: 'No player found' };
    const playerScore = player?.score;
    const scoreNeeded = selectedSet.option.scoreNeeded;
    const scorePerfect = selectedSet.option.numberOfQuestions;

    const resetDB = async () => {
      await this.prisma.set.update({
        where: { id: selectedSet.id },
        data: { selected: false },
      });
      await this.prisma.player.update({
        where: { id: player?.id },
        data: { score: 0, questionIndex: 0 },
      });
    };

    if (selectedSet.perfect) {
      await resetDB();
      return { done: true, perfect: true };
    }

    if (selectedSet.done && !selectedSet.perfect) {
      if (playerScore && playerScore >= scorePerfect) {
        await this.prisma.set.update({
          where: { id: selectedSet.id },
          data: { done: true, perfect: true },
        });
        await resetDB();
        return { done: true, perfect: true };
      } else {
        await resetDB();
        return { done: true, perfect: false };
      }
    }

    if (!selectedSet.done && !selectedSet.perfect) {
      if (
        playerScore &&
        playerScore >= scoreNeeded &&
        playerScore < scorePerfect
      ) {
        await this.prisma.set.update({
          where: { id: selectedSet.id },
          data: { done: true, perfect: false },
        });
        await this.prisma.player.update({
          where: { id: player.id },
          data: { exp: { increment: selectedSet.option.expEarned } },
        });
        await resetDB();
        return { done: true, perfect: false };
      } else if (playerScore && playerScore >= scorePerfect) {
        await this.prisma.set.update({
          where: { id: selectedSet.id },
          data: { done: true, perfect: true },
        });
        await this.prisma.player.update({
          where: { id: player.id },
          data: { exp: { increment: selectedSet.option.expEarned } },
        });
        await resetDB();
        return { done: true, perfect: true };
      } else {
        await resetDB();
        return { done: false, perfect: false };
      }
    }
  }
}
