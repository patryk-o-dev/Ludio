import { Controller, Get, Body, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findPlayer() {
    return this.playerService.findPlayer();
  }

  @Patch('add-exp')
  addExp(@Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.addExp(updatePlayerDto.exp);
  }
}
