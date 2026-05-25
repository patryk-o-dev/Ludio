import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GameConfigController } from './game-config.controller';
import { GameConfigService } from './game-config.service';

@Module({
  imports: [PrismaModule],
  controllers: [GameConfigController],
  providers: [GameConfigService],
})
export class GameConfigModule {}
