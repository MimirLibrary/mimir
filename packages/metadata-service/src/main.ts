/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule
  );
  await app.listen();
  Logger.log(`🚀 Microservice is running`);
}

bootstrap();
