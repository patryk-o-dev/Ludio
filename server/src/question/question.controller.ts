import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('/tags/:tags')
  findByTags(@Param('tags') tags: string) {
    return this.questionService.findByTags(
      tags.split(',').map((tag) => tag.trim()),
    );
  }
}
