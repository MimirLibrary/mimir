import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  async createPerson(createPersonInput: CreatePersonInput) {
    try {
      const { smg_id } = createPersonInput;
      const personFind = await Person.findOne(smg_id);
      if (personFind) {
        throw UnauthorizedException.createBody('person is exist');
      }
      const person = await Person.create(createPersonInput);
      await Person.save(person);
      return person;
    } catch (e) {
      console.log(e.message);
    }
  }
}
