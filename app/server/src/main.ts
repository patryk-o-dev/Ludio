import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { connectRedis } from './redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.enableShutdownHooks();
  await connectRedis();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
