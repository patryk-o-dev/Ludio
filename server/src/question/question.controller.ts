import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('/tags')
  findByTags(
    @Query('guess') guess: string,
    @Query('by') by: string,
    @Query('only') only?: string,
    @Query('without') without?: string,
  ) {
    return this.questionService.findByTags(guess, by, only, without);
  }

  @Get('/answer/:questionId/:answer')
  findAnswer(
    @Param('questionId') questionId: string,
    @Param('answer') answer: string,
  ) {
    return this.questionService.findAnswer(questionId, answer);
  }

  @Patch('/mark-used/:id')
  markUsed(@Param('id') id: string) {
    return this.questionService.markUsed(id);
  }
}
