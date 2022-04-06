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
import { ClaimBookInput } from '../../__generated/graphql_types';
import { BadRequestException } from '@nestjs/common';
import { current } from '@reduxjs/toolkit';

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
  async claimBook(
    @Args('person_id') person_id: number,
    @Args('input') claimBookInput: ClaimBookInput
  ) {
    const { identifier } = claimBookInput;
    const material = await Material.findOne({ where: { identifier } });
    if (!material) {
      throw new BadRequestException(
        'This book is not registered in the library'
      );
    }
    const { id } = material;
    const status = await Status.findOne({
      where: { material_id: id, person_id },
    });
    if (status.status === 'Busy') {
      throw new BadRequestException('This book is easy');
    }
    // await Status.save(status);
    // console.log('material', material);
    return material;
  }

  @ResolveField(() => [Status])
  async statuses(@Parent() material: Material) {
    const { id } = material;
    return Status.find({ where: { material_id: id } });
  }
}
