import faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Person } from '../../resources/persons/person.entity';

define(Person, () => {
  const person = new Person();
  person.smg_id = faker.datatype.uuid();
  person.location_id = 2;
  person.type = 'Reader';
  person.position = 'Fullstack Ruby Developer';
  person.email = 'example@email.com';
  person.username = 'Alina Danilevich';
  person.avatar = '';
  return person;
});
