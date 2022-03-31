import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Person } from './person.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Person')
export class PersonResolver {
  @Query(() => [Person])
  async getAllPersons() {
    return Person.find();
  }

  @Query(() => Person)
  async getOnePerson(@Args('id') id: number | string){
    return Person.findOne(id)
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() person: Person) {
    const { id } = person;
    return Status.find({ where: { person_id: id } });
  }
}
