import { Controller, Get, Param, Patch } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('/tags/:tags/')
  findByTags(@Param('tags') tags: string) {
    return this.questionService.findByTags(tags);
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
