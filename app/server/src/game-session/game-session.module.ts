import { Module } from '@nestjs/common';
import { GameSessionController } from './game-session.controller';
import { GameSessionService } from './game-session.service';
import { GameSessionGateway } from './game-session/game-session.gateway';

@Module({
  controllers: [GameSessionController],
  providers: [GameSessionService, GameSessionGateway],
})
export class GameSessionModule {}
