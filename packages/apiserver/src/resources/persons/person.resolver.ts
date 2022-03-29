import {Args, Query, Resolver} from '@nestjs/graphql';
import {PersonService} from "./person.service";
import {PersonEntity} from "./person.entity";

@Resolver('Person')
export class PersonResolver {

  constructor(private PersonService: PersonService) {
  }

  @Query(() => [PersonEntity])
  getAllPersons(){
    return this.PersonService.getAllPersons()
  }

  @Query(() => PersonEntity)
  getPersonById(@Args('id') id: number){
    return this.PersonService.getOnePerson(id)
  }

}
