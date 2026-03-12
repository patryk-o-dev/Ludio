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

  async findByTags(tags: string, resetAttempted = false) {
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    const questions = await this.prisma.question
      .findMany({
        where: {
          tags: {
            some: { name: { in: tagsArray } },
          },
          used: false,
        },
        include: { tags: true, answer: false },
      })
      .then((questions) =>
        questions.filter((q) =>
          tagsArray.every((tag) => q.tags.some((t) => t.name === tag)),
        ),
      );
    if (questions.length === 0) {
      if (!resetAttempted) {
        await this.resetUsed();
        return this.findByTags(tags, true);
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
