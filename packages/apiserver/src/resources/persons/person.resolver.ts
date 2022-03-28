import {Args, Query, Resolver} from '@nestjs/graphql';
import {PersonService} from "./person.service";

@Resolver()
export class PersonResolver {

  constructor(private PersonService: PersonService) {
  }

  @Query()
  findOne(@Args('id') id: string){
    return this.PersonService.findOne(id)
  }
}
