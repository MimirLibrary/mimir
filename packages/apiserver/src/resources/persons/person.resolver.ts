import {
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Person } from './person.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Person')
export class PersonResolver {
  @Query(() => [Person])
  getAllPersons() {
    return Person.find();
  }

  @ResolveProperty()
  async statuses(@Parent() person: Person) {
    const { id } = person;
    return Status.find({ where: { person_id: id } });
  }
}
