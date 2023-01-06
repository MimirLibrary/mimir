import {
  Args,
  Context,
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
  Permissions,
  UpdatePersonLocationInput,
} from '@mimir/global-types';
import { Message } from '../messages/message.entity';
import { BlockedUsers } from '../blocked-users/blocked-users.entity';
import { PersonService } from './person.service';
import { Grants } from '../../permission/grant.decorator';
import { Material } from '../materials/material.entity';
import * as DataLoader from 'dataloader';
import dataLoaders from '../../data-loaders';

@Resolver('Person')
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async getAllPersons(
    @Args('username') username: string,
    @Args('locations') locations: Array<number>
  ) {
    return this.personService.getAllPersons(username, locations);
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
  async addPersonLocation(
    @Args('input') updatePersonLocationInput: UpdatePersonLocationInput
  ) {
    try {
      const { location_id, person_id } = updatePersonLocationInput;
      const person = await Person.findOne(person_id, {
        relations: ['location'],
      });
      if (!person) {
        return new UnauthorizedException("A person didn't found");
      }
      const location = await Location.findOne(location_id);
      const personLocation = await Location.findOne(location);
      person.location.push(personLocation);
      return Person.save(person);
    } catch (e) {
      return new BadRequestException();
    }
  }

  @Mutation(() => Person)
  async removePersonLocation(
    @Args('input') updatePersonLocationInput: UpdatePersonLocationInput
  ) {
    try {
      const { location_id, person_id } = updatePersonLocationInput;
      const person = await Person.findOne(person_id, {
        relations: ['location'],
      });
      if (!person) {
        return new UnauthorizedException("A person didn't found");
      }
      person.location = person.location.filter((loc) => loc.id !== location_id);
      return Person.save(person);
    } catch (e) {
      return new BadRequestException();
    }
  }

  @Mutation(() => Person)
  @Grants(Permissions.GRANT_REVOKE_MANAGER)
  async changePersonRole(
    @Args('person_id') person_id: number,
    @Args('type') type: string
  ) {
    try {
      const person = await Person.findOne(person_id);
      if (!person) {
        return new UnauthorizedException("A person didn't found");
      }
      person.type = type;
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

  @ResolveField(() => [Permissions])
  async permissions(@Parent() person: Person) {
    const { permissions } = person;
    return permissions && permissions.split(',');
  }

  @ResolveField(() => [Material])
  async materials(
    @Parent() person: Person,
    @Context(dataLoaders.materialsByPersonsLoader)
    materialsLoader: DataLoader<number, Material[]>
  ): Promise<(Error | Material)[]> {
    return materialsLoader.load(person.id);
  }
}
