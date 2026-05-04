import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

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
}
