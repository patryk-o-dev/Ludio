import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlayerModule } from './player/player.module';
import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';
import { ChipsModule } from './chips/chips.module';

@Module({
  imports: [PrismaModule, PlayerModule, CategoryModule, GameModule, ChipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
