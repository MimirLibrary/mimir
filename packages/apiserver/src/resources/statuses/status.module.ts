import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './status.entity';
import { StatusResolver } from './status.resolver';
import { StatusService } from './status.service';
import { StatusesLoaderFactoryService } from './statuses-loader-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusResolver, StatusService, StatusesLoaderFactoryService],
  exports: [StatusService, StatusesLoaderFactoryService],
})
export class StatusModule {}
