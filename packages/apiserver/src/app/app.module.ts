import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../ormconfig';
import { MaterialModule } from '../resources/materials/material.module';
import { StatusModule } from '../resources/statuses/status.module';
import { PersonModule } from '../resources/persons/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      ...typeorm,
    }),
    MaterialModule,
    StatusModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
