import { Controller, Get, Patch, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id/upgrade')
  upgrade(@Param('id') id: string) {
    return this.categoryService.upgrade(id);
  }
}
