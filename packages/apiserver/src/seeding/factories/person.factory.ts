import faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Person } from '../../resources/persons/person.entity';

define(Person, () => {
  const person = new Person();
  person.smg_id = faker.datatype.uuid();
  person.location_id = 2;
  person.type = 'Reader';
  person.name = 'Alina';
  person.email = 'lalal@google.com';
  person.position = 'Fullstack Ruby Developer';
  return person;
});
