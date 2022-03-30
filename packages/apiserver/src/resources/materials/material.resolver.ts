import { Query, Resolver } from '@nestjs/graphql';
import { Material } from './material.entity';

@Resolver('Material')
export class MaterialResolver {
  @Query(() => [Material])
  getAllMaterials() {
    return Material.find();
  }
}