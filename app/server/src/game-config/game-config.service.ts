import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameConfigDto } from './dto/create-game-config.dto';

@Injectable()
export class GameConfigService {
  constructor(private readonly prisma: PrismaService) {}

  createSession(dto: CreateGameConfigDto) {
    return this.prisma.gameConfig.create({
      data: {
        options: {
          create: {
            difficulty: dto.options.difficulty,
            questionLimit: dto.options.questionLimit,
            timeLimitSeconds: dto.options.timeLimitSeconds ?? null,
          },
        },
        rules: {
          create: dto.rules.map((r) => ({
            chipGuessId: r.chipGuessId,
            chipById: r.chipById,
            chipFilters: {
              connect: (r.chipFilterIds ?? []).map((id) => ({ id })),
            },
            description: r.description,
          })),
        },
      },
      include: {
        options: true,
        rules: true,
      },
    });
  }
}
