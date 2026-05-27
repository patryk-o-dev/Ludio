import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSessionService } from './game-session.service';

@Controller('game-session')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  create(@Body() dto: CreateGameSessionDto) {
    return this.gameSessionService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameSessionService.findOne(id);
  }

  @Patch(':id/accept')
  acceptInvitation(
    @Param('id') sessionId: string,
    @Body('userId') userId: string,
  ) {
    return this.gameSessionService.acceptInvitation(sessionId, userId);
  }
}
