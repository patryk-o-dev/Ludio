import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChipsModule } from './chips/chips.module';
import { GameConfigModule } from './game-config/game-config.module';

@Module({
  imports: [PrismaModule, ChipsModule, GameConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
