import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Patch(':id/earn-exp')
  earnExp(
    @Param('id') id: string,
    @Body('exp') exp: number,
    @Body('setId') setId: string,
  ) {
    return this.playerService.earnExp(id, exp, setId);
  }
}
