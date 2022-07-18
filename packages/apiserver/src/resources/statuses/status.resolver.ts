import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Status } from './status.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CreateStatusInput } from '@mimir/global-types';
import { AuthGuard } from '../../auth/auth.guard';
import { Notification } from '../notifications/notification.entity';
import { Person } from '../persons/person.entity';

@Resolver('Status')
export class StatusResolver {
  @Query(() => [Status])
  @UseGuards(AuthGuard)
  async getStatusesByPerson(@Args('person_id') id: string) {
    return Status.find({ where: { person_id: id } });
  }

  @Query(() => [Status])
  @UseGuards(AuthGuard)
  async getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({ where: { material_id: id } });
  }

  @ResolveField(() => Person)
  async person(@Parent() status: Status) {
    const { person_id } = status;
    return Person.findOne(person_id);
  }

  @Mutation(() => Status)
  @UseGuards(AuthGuard)
  async createStatus(@Args('input') createStatusInput: CreateStatusInput) {
    try {
      const status = await Status.create(createStatusInput);
      await Status.save(status);
      return status;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
