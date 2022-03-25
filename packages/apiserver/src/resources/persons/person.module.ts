import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
})
export class PersonModule {}
