import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialEntity } from './material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity])],
})
export class MaterialModule {}
