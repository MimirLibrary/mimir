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
import { Person } from '../persons/person.entity';
import { StatusService } from './status.service';
import { Material } from '../materials/material.entity';
import { JwtAuthGuard } from '../../auth/guard';

@Resolver('Status')
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}
  @Query(() => [Status])
  @UseGuards(JwtAuthGuard)
  async getStatusesByPerson(@Args('person_id') id: string) {
    return Status.find({ where: { person_id: id } });
  }

  @Query(() => [Status])
  @UseGuards(JwtAuthGuard)
  async getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({ where: { material_id: id } });
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
  @UseGuards(JwtAuthGuard)
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
