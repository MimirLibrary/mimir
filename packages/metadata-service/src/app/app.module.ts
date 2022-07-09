import { Module } from '@nestjs/common';
import { ReadersModules } from '../readers/readers.modules';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ReadersModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
