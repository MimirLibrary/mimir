import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Status } from './status.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreateStatusInput, RolesTypes } from '@mimir/global-types';
import { Person } from '../persons/person.entity';
import { StatusService } from './status.service';
import { Material } from '../materials/material.entity';
import { CurrentUser } from '../../auth/current-user';

@Resolver('Status')
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}
  @Query(() => [Status])
  async getStatusesByPerson(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    if (currentUser.type !== RolesTypes.MANAGER && +id !== +currentUser.id) {
      return new ForbiddenException();
    }
    return Status.find({ where: { person_id: id } });
  }

  @Query(() => [Status])
  async getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({
      where: { material_id: id },
      order: { created_at: 'ASC' },
    });
  }

  @ResolveField(() => Person)
  async person(@Parent() status: Status) {
    const { person_id } = status;
    return Person.findOne(person_id);
  }

  @Query(() => [Status])
  async getAllStatusesIsOverdue(@Args('locations') locations: Array<number>) {
    return this.statusService.allOverdueStatuses(locations);
  }

  @Mutation(() => Status)
  async createStatus(@Args('input') createStatusInput: CreateStatusInput) {
    try {
      const status = await Status.create(createStatusInput);
      await Status.save(status);
      return status;
    } catch (e) {
      throw new BadRequestException();
    }
  }
  @ResolveField(() => Material)
  async material(@Parent() statuses: Status) {
    const { material_id } = statuses;
    return Material.findOne({ where: { id: material_id } });
  }
}
