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

  @Get(':id/state')
  findState(@Param('id') id: string) {
    return this.gameSessionService.findState(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameSessionService.findOne(id);
  }

  @Get(':id/players')
  getPlayers(@Param('id') sessionId: string) {
    return this.gameSessionService.getPlayers(sessionId);
  }

  @Patch(':id/accept')
  acceptInvitation(
    @Param('id') sessionId: string,
    @Body('userId') userId: string,
  ) {
    return this.gameSessionService.respondInvitation(sessionId, userId, true);
  }

  @Patch(':id/respond')
  respondInvitation(
    @Param('id') sessionId: string,
    @Body('userId') userId: string,
    @Body('accept') accept: boolean,
  ) {
    return this.gameSessionService.respondInvitation(sessionId, userId, accept);
  }
}
