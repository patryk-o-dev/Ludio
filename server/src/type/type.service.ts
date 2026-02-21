import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.type.findMany({
      include: {
        answers: true,
      },
    });
  }
}
