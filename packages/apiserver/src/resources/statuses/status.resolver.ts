import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Status } from './status.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateStatusInput } from '@mimir/global-types';

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
    try {
      const status = await Status.create(createStatusInput);
      await Status.save(status);
      return status;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
