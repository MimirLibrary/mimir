import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Person } from './person.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Person')
export class PersonResolver {
  @Query(() => [Person])
  getAllPersons() {
    return Person.find();
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() person: Person) {
    const { id } = person;
    return Status.find({ where: { person_id: id } });
  }
}
