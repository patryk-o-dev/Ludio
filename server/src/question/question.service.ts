import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.question.findMany({
      include: {
        tags: true,
      },
    });
  }

  async markUsed(id: string) {
    return this.prisma.question.update({
      where: { id },
      data: { used: true },
    });
  }

  async findByTags(
    guess: string,
    by: string,
    only: string,
    without: string,
    resetAttempted = false,
  ) {
    const guessArray = guess ? guess.split(',').map((t) => t.trim()) : [];
    const byArray = by ? by.split(',').map((t) => t.trim()) : [];
    const onlyArray = only ? only.split(',').map((t) => t.trim()) : [];
    const withoutArray = without ? without.split(',').map((t) => t.trim()) : [];

    const where: any = {
      used: false,
      AND: [
        ...(guessArray.length
          ? [{ tags: { some: { name: { in: guessArray } } } }]
          : []),
        ...(byArray.length
          ? [{ tags: { some: { name: { in: byArray } } } }]
          : []),
        ...onlyArray.map((tag) => ({
          tags: { some: { name: tag } },
        })),
        ...(withoutArray.length
          ? [{ tags: { none: { name: { in: withoutArray } } } }]
          : []),
      ],
    };

    const questions = await this.prisma.question.findMany({
      where,
      include: { tags: true },
    });

    if (questions.length === 0) {
      if (!resetAttempted) {
        await this.resetUsed();
        return this.findByTags(guess, by, only, without, true);
      }
      return [];
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    await this.markUsed(questions[randomIndex].id);
    return questions[randomIndex];
  }

  async findAnswer(questionId: string, answer: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { answer: true },
    });
    const answerRecord = await this.prisma.answer.findUnique({
      where: { value: answer },
    });
    if (answerRecord && question?.answerId === answerRecord.id) {
      return true;
    } else {
      return false;
    }
  }

  async resetUsed() {
    return this.prisma.question.updateMany({
      where: { used: true },
      data: { used: false },
    });
  }
}
