import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { QuestionModule } from './question/question.module';
import { TagModule } from './tag/tag.module';
import { AnswerModule } from './answer/answer.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [PrismaModule, QuestionModule, TagModule, AnswerModule, TypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
