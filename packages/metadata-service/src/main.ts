import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  //const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //  AppModule,
  //  {
  //    // TODO Use UDS / pipes
  //    transport: Transport.TCP,
  //  }
  //);
  //await app.listen();
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  Logger.log(`🚀 Microservice is running`);
}

bootstrap();
