import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { QuestionModule } from './question/question.module';
import { TagModule } from './tag/tag.module';
import { AnswerModule } from './answer/answer.module';
import { SetModule } from './set/set.module';
import { PlayerModule } from './player/player.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    PrismaModule,
    QuestionModule,
    TagModule,
    AnswerModule,
    SetModule,
    PlayerModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
