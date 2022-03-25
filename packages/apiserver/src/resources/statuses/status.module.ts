import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from './status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
})
export class StatusModule {}
