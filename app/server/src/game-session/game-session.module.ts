import { Module } from '@nestjs/common';
import { GameSessionController } from './game-session.controller';
import { GameSessionService } from './game-session.service';
import { GameSessionGateway } from './game-session/game-session.gateway';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [GameSessionController],
  providers: [GameSessionService, GameSessionGateway],
})
export class GameSessionModule {}
