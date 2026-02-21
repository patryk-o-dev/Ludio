import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({
      data: {
        name: createTagDto.name,
        category: createTagDto.category,
      },
    });
  }

  findAll() {
    return this.prisma.tag.findMany({
      include: {
        questions: true,
      },
    });
  }

  remove(name: string) {
    return this.prisma.tag.delete({
      where: { name },
    });
  }
}
