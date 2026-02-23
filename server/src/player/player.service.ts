import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.player.findMany();
  }

  earnExp(playerId: string, exp: number) {
    return this.prisma.player.update({
      where: { id: playerId },
      data: { exp: { increment: exp } },
    });
  }
}
