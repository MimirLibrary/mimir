import { Args, Query, Resolver } from '@nestjs/graphql';
import { MaterialService } from './material.service';

@Resolver('IMetaOfMaterial')
export class MetadataMaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Query()
  async getMaterialByIdentifierFromMetadata(
    @Args('identifier') identifier: string
  ) {
    return this.materialService.getMaterialByIdentifierFromMetadata(identifier);
  }
}
