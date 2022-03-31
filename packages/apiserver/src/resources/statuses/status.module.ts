import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './status.entity';
import { StatusResolver } from './status.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusResolver],
})
export class StatusModule {}
