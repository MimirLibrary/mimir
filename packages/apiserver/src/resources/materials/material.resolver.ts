import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation
} from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';
import { CreateMaterialInput } from '../../__generated/graphql_types';

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

  @Mutation(() => Material)
  async createMaterial(@Args('input') createMaterialInput: CreateMaterialInput) {
    try {
      const identifier = createMaterialInput.identifier;
      const getMaterial = await Material.findOne({ where: { identifier } });
      if (getMaterial) {
        throw Error('a material already exists');
      }
      const material = await Material.create(createMaterialInput);
      await Material.save(material);
      return material;
    }
    catch (e) {
      console.log(e.message);
    }
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}

