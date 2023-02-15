import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
import * as DataLoader from 'dataloader';
import DataLoaderType from '../../data-loader-type';
import { ManagerGuard } from '../../auth/manager.guard';
import { CurrentUser } from '../../auth/current-user';
import { checkIsManagerOrMatchingId } from '../../auth/auth-util';

@Resolver('Person')
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  @UseGuards(ManagerGuard)
  async getAllPersons(
    @Args('username') username: string,
    @Args('locations') locations: Array<number>
  ) {
    return this.personService.getAllPersons(username, locations);
  }

  @Query(() => Person)
  async getOnePerson(
    @Args('id') id: number | string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsManagerOrMatchingId(currentUser, +id);
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
    @Args('input') updatePersonLocationInput: UpdatePersonLocationInput,
    @CurrentUser() currentUser: Person
  ) {
    try {
      const { location_id, person_id } = updatePersonLocationInput;
      checkIsManagerOrMatchingId(currentUser, +person_id);
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
    @Args('input') updatePersonLocationInput: UpdatePersonLocationInput,
    @CurrentUser() currentUser: Person
  ) {
    try {
      const { location_id, person_id } = updatePersonLocationInput;
      checkIsManagerOrMatchingId(currentUser, +person_id);
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
        return new NotFoundException("The person wasn't found");
      }
      person.type = type;
      await person.save();
      return person;
    } catch (e) {
      return new BadRequestException();
    }
  }

  @ResolveField(() => [Status])
  async statuses(
    @Parent() person: Person,
    @Context(DataLoaderType.personsStatusesLoader)
    personsStatusesLoader: DataLoader<number, [Status]>
  ) {
    const { id } = person;
    return personsStatusesLoader.load(id);
  }

  @ResolveField(() => [Notification])
  async notifications(
    @Parent() person: Person,
    @Context(DataLoaderType.personsNotificationsLoader)
    personsNotificationsLoader: DataLoader<number, [Notification]>
  ) {
    const { id } = person;
    return personsNotificationsLoader.load(id);
  }

  @ResolveField(() => [Message])
  async messages(
    @Parent() person: Person,
    @Context(DataLoaderType.personsMessagesLoader)
    personsMessagesLoader: DataLoader<number, [Message]>
  ) {
    const { id } = person;
    return personsMessagesLoader.load(id);
  }

  @ResolveField(() => [BlockedUsers])
  async states(
    @Parent() person: Person,
    @Context(DataLoaderType.blockedUsersLoader)
    blockedUsersLoader: DataLoader<number, [BlockedUsers]>
  ) {
    const { id } = person;
    return blockedUsersLoader.load(id);
  }

  @ResolveField(() => [Permissions])
  async permissions(@Parent() person: Person) {
    const { permissions } = person;
    return permissions && permissions.split(',');
  }
}
