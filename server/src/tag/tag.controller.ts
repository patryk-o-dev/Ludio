import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.tagService.remove(name);
  }
}
