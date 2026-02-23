import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  enhanceCategory(categoryId: string) {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { lvl: { increment: 1 } },
    });
  }
}
