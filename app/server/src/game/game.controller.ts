import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CheckAnswerDto } from './dto/check-answer.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Post(':id/check-answer')
  checkAnswer(@Param('id') id: string, @Body() checkAnswerDto: CheckAnswerDto) {
    return this.gameService.checkAnswer(id, checkAnswerDto.value);
  }

  @Get(':id/answers')
  getAnswersForCurrentQuestion(@Param('id') id: string) {
    return this.gameService.getAnswersForCurrentQuestion(id);
  }

  @Patch(':id/next-question')
  nextQuestion(@Param('id') id: string) {
    return this.gameService.nextQuestion(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}
