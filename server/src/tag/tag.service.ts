import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tag.findMany({
      include: {
        questions: true,
        category: true,
      },
    });
  }

  remove(name: string) {
    return this.prisma.tag.delete({
      where: { name },
    });
  }
}
