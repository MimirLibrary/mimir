import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonResolver } from './person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonResolver],
})
export class PersonModule {}
