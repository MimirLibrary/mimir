import {Args, Query, Resolver} from '@nestjs/graphql';
import { Person } from './person.entity';

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
}
