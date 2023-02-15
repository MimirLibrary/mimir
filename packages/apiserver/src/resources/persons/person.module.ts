import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
import { PersonsLoaderFactoryService } from './persons-loader-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonResolver, PersonService, PersonsLoaderFactoryService],
  exports: [PersonsLoaderFactoryService],
})
export class PersonModule {}
