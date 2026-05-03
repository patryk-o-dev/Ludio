import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  findPlayer() {
    return this.prisma.player.findFirst();
  }

  async addExp(expToAdd: number) {
    let player = await this.findPlayer();
    let remaining = expToAdd;
    while (remaining > 0) {
      const expNeeded = player.expNextLvl - player.exp;

      if (remaining >= expNeeded) {
        remaining -= expNeeded;
        player = await this.prisma.player.update({
          where: { id: player.id },
          data: {
            lvl: { increment: 1 },
            kp: { increment: 1 },
            exp: 0,
            expNextLvl: player.expNextLvl + 10,
          },
        });
      } else {
        player = await this.prisma.player.update({
          where: { id: player.id },
          data: { exp: { increment: remaining } },
        });
        remaining = 0;
      }
    }
    return player;
  }
}
