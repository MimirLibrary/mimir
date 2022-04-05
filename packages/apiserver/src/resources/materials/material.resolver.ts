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
import { BadRequestException } from '@nestjs/common';

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
      const existMaterial = await Material.findOne({ where: { identifier } });
      if (existMaterial) return new Error('a material already exists');
      return Material.addMaterial(createMaterialInput)
    } catch(e) {
      return new BadRequestException()
    }
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}

