import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';
import { CreateMaterialInput } from '@mimir/global-types';
import { Notification } from '../notifications/notification.entity';
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
  async createMaterial(
    @Args('input') createMaterialInput: CreateMaterialInput
  ) {
    const identifier = createMaterialInput.identifier;
    const existMaterial = await Material.findOne({ where: { identifier } });
    if (existMaterial) return new Error('a material already exists');
    const material = await Material.create(createMaterialInput);
    return await Material.save(material);
  }

  @Mutation(() => Material)
  async removeMaterial(
    @Args('input') removeMaterialInput: CreateMaterialInput
  ) {
    try {
      const identifier = removeMaterialInput.identifier;
      const material = await Material.findOne({
        where: { identifier },
      });
      await Status.delete({ material_id: material.id });
      await Material.remove({ ...material } as Material);
      return material;
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
  @Mutation(() => Material)
  async updateMaterial(
    @Args('input') updateMaterialInput: CreateMaterialInput
  ) {
    try {
      const identifier = updateMaterialInput.identifier;
      const material = await Material.findOne({
        where: { identifier },
      });
      const editMaterial = await Material.update(
        { ...material } as Material,
        updateMaterialInput
      );
      return editMaterial;
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({
      where: { material_id: id },
      order: { id: 'ASC' },
    });
  }
  @ResolveField(() => [Notification])
  async notifications(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}
