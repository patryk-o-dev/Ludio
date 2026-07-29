import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSessionService } from './game-session.service';
import { CurrentUser } from '@/current-user.decorator';

@Controller('game-session')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Get('invites')
  findInvites(@CurrentUser('id') userId: string) {
    return this.gameSessionService.findPendingInvites(userId);
  }

  @Post()
  create(@CurrentUser('id') hostId: string, @Body() dto: CreateGameSessionDto) {
    return this.gameSessionService.create(hostId, dto);
  }

  @Get(':id/state')
  findState(@Param('id') id: string) {
    return this.gameSessionService.findState(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameSessionService.findOne(id);
  }

  @Post(':id/join')
  join(@Param('id') sessionId: string) {
    return this.gameSessionService.joinSession(sessionId);
  }

  @Patch(':id/surrender')
  playerSurrender(
    @Param('id') sessionId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.gameSessionService.playerSurrender(userId, sessionId);
  }

  @Patch(':id/respond')
  respondInvitation(
    @Param('id') sessionId: string,
    @CurrentUser('id') userId: string,
    @Body('accept') accept: boolean,
  ) {
    return this.gameSessionService.respondInvitation(sessionId, userId, accept);
  }

  @Patch(':id/start')
  startGame(@Param('id') sessionId: string, @CurrentUser('id') userId: string) {
    return this.gameSessionService.startGame(sessionId, userId);
  }
}
