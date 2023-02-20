import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Status } from './status.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateStatusInput } from '@mimir/global-types';
import { Person } from '../persons/person.entity';
import { StatusService } from './status.service';
import { Material } from '../materials/material.entity';
import * as DataLoader from 'dataloader';
import DataLoaders from '../../data-loaders';
import { CurrentUser } from '../../auth/current-user';
import { checkIsManagerOrMatchingId } from '../../auth/auth-util';

@Resolver('Status')
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}
  @Query(() => [Status])
  async getStatusesByPerson(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsManagerOrMatchingId(currentUser, +id);
    return Status.find({ where: { person_id: id } });
  }

  @Query(() => [Status])
  async getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({
      where: { material_id: id },
      order: { created_at: 'ASC' },
    });
  }

  @Query(() => [Status])
  async getAllStatusesIsOverdue(@Args('locations') locations: Array<number>) {
    return this.statusService.getCurrentBusyAndProlongStatuses(locations);
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

  @ResolveField(() => Person)
  async person(
    @Parent() status: Status,
    @Context(DataLoaders.personsLoader)
    personsLoader: DataLoader<number, Person>
  ) {
    const { person_id } = status;
    return personsLoader.load(person_id);
  }

  @ResolveField(() => Material)
  async material(
    @Parent() statuses: Status,
    @Context(DataLoaders.materialsLoader)
    materialsLoader: DataLoader<number, Material>
  ) {
    const { material_id } = statuses;
    return materialsLoader.load(material_id);
  }
}
