import { Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Material')
export class MaterialResolver {
  @Query(() => [Material])
  getAllMaterials() {
    return Material.find();
  }

  @ResolveProperty()
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}
