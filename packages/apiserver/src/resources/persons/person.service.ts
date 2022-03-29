import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PersonEntity} from "./person.entity";
import {Repository} from "typeorm";

@Injectable()
export class PersonService {

  constructor(@InjectRepository(PersonEntity) private PersonEntityRepository: Repository<PersonEntity>) {
  }

  async getAllPersons() : Promise<PersonEntity[]>{
    const persons = await this.PersonEntityRepository.find()
    return persons
  }

  async getOnePerson(id: number) : Promise<PersonEntity>{
    const person = await this.PersonEntityRepository.findOne({id})
    return person
  }
}
