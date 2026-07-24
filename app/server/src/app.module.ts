import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChipsModule } from './chips/chips.module';
import { GameConfigModule } from './game-config/game-config.module';
import { GameSessionModule } from './game-session/game-session.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { CommunityModule } from './community/community.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupModule } from './cleanup/cleanup.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ChipsModule,
    GameConfigModule,
    GameSessionModule,
    RedisModule,
    UserModule,
    CommunityModule,
    ScheduleModule.forRoot(),
    CleanupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
