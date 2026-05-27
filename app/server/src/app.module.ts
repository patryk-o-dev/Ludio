import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChipsModule } from './chips/chips.module';
import { GameConfigModule } from './game-config/game-config.module';
import { GameSessionModule } from './game-session/game-session.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    ChipsModule,
    GameConfigModule,
    GameSessionModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
