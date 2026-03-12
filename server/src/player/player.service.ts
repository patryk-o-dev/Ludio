import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  findFirst() {
    return this.prisma.player.findFirst();
  }

  async earnExp(playerId: string, exp: number, setId: string) {
    const set = await this.prisma.set.findUnique({
      where: { id: setId },
    });
    if (set.done) {
      return set;
    }
    await this.prisma.set.update({
      where: { id: setId },
      data: { done: true },
    });
    const updatedPlayer = await this.prisma.player.update({
      where: { id: playerId },
      data: { exp: { increment: exp } },
    });
    return updatedPlayer;
  }

  async advanceQuestion() {
    const player = await this.prisma.player.findFirst();
    const updatedPlayer = await this.prisma.player.update({
      where: { id: player.id },
      data: { questionIndex: { increment: 1 } },
    });
    return updatedPlayer;
  }

  async advanceScore() {
    const player = await this.prisma.player.findFirst();
    const updatedPlayer = await this.prisma.player.update({
      where: { id: player.id },
      data: { score: { increment: 1 } },
    });
    return updatedPlayer;
  }
}
