import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Person } from "../../resources/persons/person.entity";

define(Person, (faker: typeof Faker) => {
  const typeOfUsers = ["admin", "user"]
  const getTypeOfUser = () => String(typeOfUsers[Math.floor(Math.random() * 2)]);

  const person = new Person();
  person.smg_id = faker.random.uuid();
  person.type = getTypeOfUser();
  return person;
});