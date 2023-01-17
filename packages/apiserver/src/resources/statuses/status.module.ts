import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './status.entity';
import { StatusResolver } from './status.resolver';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusResolver, StatusService],
  exports: [StatusService],
})
export class StatusModule {}
