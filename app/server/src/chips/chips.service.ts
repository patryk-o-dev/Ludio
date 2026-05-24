import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChipsService {
  constructor(private readonly prisma: PrismaService) {}
  getChipGuesses() {
    return this.prisma.chipGuess.findMany({
      include: { compatibleChips: { select: { id: true } } },
    });
  }

  getChipBys(chipGuessId: string) {
    return this.prisma.chipBy.findMany({
      where: {
        compatibleGuess: {
          some: { id: chipGuessId },
        },
      },
    });
  }
}
