import { Query, Resolver } from '@nestjs/graphql';
import { Person } from './person.entity';

@Resolver('Person')
export class PersonResolver {
  @Query(() => [Person])
  getAllPersons() {
    return Person.find();
  }
}
