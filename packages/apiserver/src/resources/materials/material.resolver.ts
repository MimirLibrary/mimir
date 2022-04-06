import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';

@Resolver('Material')
export class MaterialResolver {
  @Query(() => [Material])
  async getAllMaterials() {
    return Material.find();
  }

  @Query(() => Material)
  async getMaterialById(@Args('id') id: number | string) {
    return Material.findOneOrFail(id);
  }

  @Mutation(() => Status)
  async claimBook(@Args('input') claimBookInput: any) {}

  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}
