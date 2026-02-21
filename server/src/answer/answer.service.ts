import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.answer.findMany({
      include: {
        questions: true,
        type: true,
      },
    });
  }
}
