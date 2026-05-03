import { Controller, Get, Param, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id/enhance')
  enhanceCategory(@Param('id') id: string) {
    return this.categoryService.enhanceCategory(id);
  }
}
