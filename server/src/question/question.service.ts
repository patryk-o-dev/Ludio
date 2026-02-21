import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        media: createQuestionDto.media,
        answerId: createQuestionDto.answerId,
        tags: {
          connect: createQuestionDto.tags.map((tag) => ({ name: tag })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.question.findMany({
      include: {
        answer: true,
        tags: true,
      },
    });
  }

  findByTags(tags: string[]) {
    return this.prisma.question
      .findMany({
        where: {
          tags: {
            some: { name: { in: tags } },
          },
        },
        include: { answer: true, tags: true },
      })
      .then((questions) =>
        questions.filter((q) =>
          tags.every((tag) => q.tags.some((t) => t.name === tag)),
        ),
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
