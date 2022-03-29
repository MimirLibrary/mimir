import { Injectable } from '@nestjs/common';
import { PersonEntity } from './person.entity';

@Injectable()
export class PersonService {
  async getAllPersons(): Promise<PersonEntity[]> {
    return PersonEntity.getAllPersons();
  }

  async getOnePerson(id: number): Promise<PersonEntity> {
    return PersonEntity.getOnePerson(id);
  }
}
