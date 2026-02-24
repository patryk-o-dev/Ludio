import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.player.findMany();
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
}
