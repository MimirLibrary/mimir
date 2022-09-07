import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3002;
  await app.listen(port);
  Logger.log(`🚀 Email microservice is running on: http://localhost:${port}`);
}

bootstrap();
