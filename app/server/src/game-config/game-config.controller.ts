import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameConfigDto } from './dto/create-game-config.dto';
import { GameConfigService } from './game-config.service';

@Controller('game-config')
export class GameConfigController {
  constructor(private readonly gameConfigService: GameConfigService) {}

  @Post('session')
  createSession(@Body() dto: CreateGameConfigDto) {
    return this.gameConfigService.createSession(dto);
  }
}
