import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Status } from './status.entity';
import { CreateStatusInput } from '../../__generated/graphql_types';

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
    return await Status.createStatus(createStatusInput);
  }
}
