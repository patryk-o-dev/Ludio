import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SetService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.set.findMany({
      include: {
        tags: {
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
        tags: true,
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
        tags: true,
        option: true,
      },
    });
  }
}
