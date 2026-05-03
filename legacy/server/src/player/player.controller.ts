import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findFirst() {
    return this.playerService.findFirst();
  }

  @Patch(':id/earn-exp')
  earnExp(
    @Param('id') id: string,
    @Body('exp') exp: number,
    @Body('setId') setId: string,
  ) {
    return this.playerService.earnExp(id, exp, setId);
  }

  @Patch('/advance-question')
  advanceQuestion() {
    return this.playerService.advanceQuestion();
  }

  @Patch('/advance-score')
  advanceScore() {
    return this.playerService.advanceScore();
  }
}
