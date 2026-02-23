import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SetService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.set.findMany({
      include: {
        tags: true,
      },
    });
  }
}
