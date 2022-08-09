import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Person } from './person.entity';
import { Status } from '../statuses/status.entity';
import { Notification } from '../notifications/notification.entity';
import { Location } from '../locations/location.entity';
import {
  CreatePersonInput,
  UpdatePersonLocationInput,
} from '@mimir/global-types';
import { Message } from '../messages/message.entity';
import { BlockedUsers } from '../blocked-users/blocked-users.entity';
import { CurrentUserLocation } from '../CurrentUserLocation.decorator';
import { PersonService } from './person.service';

@Resolver('Person')
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async getAllPersons(
    @Args('username') username: string,
    @CurrentUserLocation() location: Location
  ) {
    return this.personService.getAllPersons(username, location);
  }

  @Query(() => Person)
  async getOnePerson(@Args('id') id: number | string) {
    return Person.findOne(id);
  }

  @Mutation(() => Person)
  async createPerson(@Args('input') createPersonInput: CreatePersonInput) {
    try {
      const { smg_id } = createPersonInput;
      const personFind = await Person.findOne(smg_id);
      if (personFind) {
        return new UnauthorizedException('A person already exists');
      }
      const person = Person.create(createPersonInput);
      await Person.save(person);
      return person;
    } catch (e) {
      return new BadRequestException();
    }
  }

  @Mutation(() => Person)
  async updatePersonLocation(
    @Args('input') updatePersonLocationInput: UpdatePersonLocationInput
  ) {
    try {
      const { location_id, person_id } = updatePersonLocationInput;
      const person = await Person.findOne(person_id);
      if (!person) {
        return new UnauthorizedException("A person didn't found");
      }
      person.location_id = location_id;
      await person.save();
      return person;
    } catch (e) {
      return new BadRequestException();
    }
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() person: Person) {
    const { id } = person;
    return Status.find({ where: { person_id: id } });
  }

  @ResolveField(() => [Notification])
  async notifications(@Parent() person: Person) {
    const { id } = person;
    return Notification.find({ where: { person_id: id } });
  }

  @ResolveField(() => [Message])
  async messages(@Parent() person: Person) {
    const { id } = person;
    return Message.find({ where: { person_id: id } });
  }

  @ResolveField(() => [BlockedUsers])
  async states(@Parent() person: Person) {
    const { id } = person;
    return BlockedUsers.find({ where: { person_id: id } });
  }

  @ResolveField(() => [Location])
  async location(@Parent() person: Person) {
    const { location_id } = person;
    return Location.findOne({ where: { id: location_id } });
  }
}
