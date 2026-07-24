import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron('0 0 * * *')
  async cleanupSessions() {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() - 24);

    await this.prisma.gameSession.deleteMany({
      where: {
        startedAt: {
          lt: expirationDate,
        },
      },
    });
  }
}
