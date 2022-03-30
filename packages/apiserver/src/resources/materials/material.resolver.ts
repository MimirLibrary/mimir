import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Material')
export class MaterialResolver {
  @Query(() => [Material])
  getAllMaterials() {
    return Material.find();
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}
