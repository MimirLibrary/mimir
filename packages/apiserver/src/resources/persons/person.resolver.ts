import { Query, Resolver } from '@nestjs/graphql';
import {PersonService} from "./person.service";
import {PersonEntity} from "./person.entity";

@Resolver('Person')
export class PersonResolver {

  constructor(private PersonService: PersonService) {
  }

  @Query(returns => [PersonEntity])
  findAll(){
    return this.PersonService.getAllPersons()
  }

}
