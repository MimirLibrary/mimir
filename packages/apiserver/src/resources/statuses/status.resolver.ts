import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Status } from './status.entity';
import { CreateStatusInput } from '../../__generated/graphql_types';
import { BadRequestException } from '@nestjs/common';

@Resolver('Status')
export class StatusResolver {
  @Query(() => [Status])
  async getStatusesByPerson(@Args('person_id') id: string) {
    return Status.find({ where: { person_id: id } });
  }

  @Query(() => [Status])
  async getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({ where: { material_id: id } });
  }

  @Mutation(() => Status)
  async createStatus(@Args('input') createStatusInput: CreateStatusInput) {
    let status: Status;
    try {
      status = await Status.createStatus(createStatusInput);
    } catch (e) {
      throw new BadRequestException();
    }
    return status;
  }
}
