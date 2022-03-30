import { Args, Query, Resolver } from '@nestjs/graphql';
import { Status } from './status.entity';

@Resolver('Status')
export class StatusResolver {
  @Query(() => [Status])
  getStatusesByPerson(@Args('person_id') id: string) {
    return Status.find({ relations: ['person'], where: { status: id } });
  }

  @Query(() => [Status])
  getStatusesByMaterial(@Args('material_id') id: string) {
    return Status.find({ where: { material_id: id } });
  }
}
