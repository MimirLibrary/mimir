import faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Person } from '../../resources/persons/person.entity';

define(Person, () => {
  const typeOfUsers = ['admin', 'user'];
  const getTypeOfUser = () =>
    String(typeOfUsers[Math.floor(Math.random() * 2)]);

  const person = new Person();
  person.smg_id = faker.datatype.uuid();
  person.type = getTypeOfUser();
  return person;
});
