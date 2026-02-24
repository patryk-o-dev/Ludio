import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  async enhanceCategory(categoryId: string) {
    const player = await this.prisma.player.findFirst();
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!player || player.exp <= 0) {
      throw new Error('Not enough EXP to enhance category!');
    } else if (category.maxed) {
      await this.prisma.category.update({
        where: { id: categoryId },
        data: { maxed: true },
      });
    } else {
      await this.prisma.player.update({
        where: { id: player.id },
        data: { exp: { decrement: 1 } },
      });
      await this.prisma.category.update({
        where: { id: categoryId },
        data: { expAdded: { increment: 1 } },
      });

      if (
        category.expAdded + 1 >= category.expNeeded &&
        category.lvl < category.lvlMax
      ) {
        await this.prisma.category.update({
          where: { id: categoryId },
          data: {
            lvl: { increment: 1 },
            expAdded: 0,
            expNeeded: category.lvl + 1,
          },
        });
        const updatedCategory = await this.prisma.category.findUnique({
          where: { id: categoryId },
        });
        await this.prisma.tag.updateMany({
          where: {
            categoryId: categoryId,
            unlocked: false,
            lvl: updatedCategory.lvl,
          },
          data: { unlocked: true },
        });

        return updatedCategory;
      }
    }
  }
}
