import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type ChipLvlField =
  | 'gamingLvl'
  | 'watchingLvl'
  | 'animationsLvl'
  | 'soundsLvl'
  | 'twitchLvl'
  | 'hearthLvl'
  | 'charactersLvl'
  | 'variousLvl';

const CATEGORY_TO_CHIP_FIELD: Record<string, ChipLvlField> = {
  gaming: 'gamingLvl',
  watching: 'watchingLvl',
  animation: 'animationsLvl',
  animations: 'animationsLvl',
  sound: 'soundsLvl',
  sounds: 'soundsLvl',
  twitch: 'twitchLvl',
  heart: 'hearthLvl',
  hearth: 'hearthLvl',
  characters: 'charactersLvl',
  various: 'variousLvl',
};

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  async upgrade(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category #${id} not found`);

    if (category.lvl >= category.lvlMax) {
      throw new BadRequestException('Category is already at max level');
    }

    const player = await this.prisma.player.findFirst();
    if (!player) throw new NotFoundException('Player not found');

    if (player.kp < 1) {
      throw new BadRequestException('Not enough KP');
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { lvl: { increment: 1 } },
    });

    await this.prisma.player.update({
      where: { id: player.id },
      data: { kp: { decrement: 1 } },
    });

    await this.unlockEligibleChips(updatedCategory.name, updatedCategory.lvl);

    return updatedCategory;
  }

  private async unlockEligibleChips(categoryName: string, newLvl: number) {
    const field = CATEGORY_TO_CHIP_FIELD[categoryName.toLowerCase()];
    if (!field) return;

    await this.prisma.chipGuess.updateMany({
      where: { unlocked: false, [field]: { gte: newLvl } },
      data: { unlocked: true },
    });

    await this.prisma.chipBy.updateMany({
      where: { unlocked: false, [field]: { gte: newLvl } },
      data: { unlocked: true },
    });
  }
}
