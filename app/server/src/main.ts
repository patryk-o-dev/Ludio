import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { getFrontendOrigin } from './config/frontend-origin';
import { connectRedis } from './redis';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: getFrontendOrigin(),
    credentials: true,
  });

  app.useStaticAssets(join(process.cwd(), 'public'), { prefix: '/static/' });
  app.use(cookieParser());

  await app.enableShutdownHooks();
  await connectRedis();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
