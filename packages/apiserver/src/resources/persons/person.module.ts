import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import {PersonService} from "./person.service";
import {PersonResolver} from "./person.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonService, PersonResolver]
})
export class PersonModule {}
