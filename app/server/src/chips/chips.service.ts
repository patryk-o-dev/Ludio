import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChipsService {
  constructor(private readonly prisma: PrismaService) {}

  getChipGuesses() {
    return this.prisma.chipGuess.findMany({
      include: { compatibleChipBy: { select: { id: true } } },
    });
  }

  getChipBys(chipGuessId: string) {
    return this.prisma.chipBy.findMany({
      where: {
        compatibleChipGuess: {
          some: { id: chipGuessId },
        },
      },
      include: { compatibleChipFilter: { select: { id: true } } },
    });
  }

  getChipFilters(chipById: string) {
    return this.prisma.chipFilter.findMany({
      where: {
        compatibleChipBy: {
          some: { id: chipById },
        },
      },
    });
  }
}
