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
import {
  CreateMaterialInput,
  UpdateMaterialInput,
  RemoveMaterialInput,
  DonateBookInput,
  SearchInput,
} from '@mimir/global-types';
import { Notification } from '../notifications/notification.entity';
import { MaterialService } from './material.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Message } from '../messages/message.entity';
import { AuthGuard } from '../../auth/auth.guard';

@Resolver('Material')
export class MaterialResolver {
  constructor(private materialService: MaterialService) {}

  @Query(() => [Material])
  @UseGuards(AuthGuard)
  async getAllMaterials() {
    return Material.find();
  }

  @Query(() => Material)
  @UseGuards(AuthGuard)
  async getMaterialById(@Args('id') id: number | string) {
    return Material.findOneOrFail(id);
  }

  @Query(() => [Material])
  @UseGuards(AuthGuard)
  async searchOfMaterials(@Args('input') searchInput: SearchInput) {
    return this.materialService.search(searchInput);
  }

  @Mutation(() => Material)
  @UseGuards(AuthGuard)
  async donateBook(@Args('input') donateBookInput: DonateBookInput) {
    return this.materialService.donate(donateBookInput);
  }

  @Mutation(() => Material)
  @UseGuards(AuthGuard)
  async createMaterial(
    @Args('input') createMaterialInput: CreateMaterialInput
  ) {
    const identifier = createMaterialInput.identifier;
    const existMaterial = await Material.findOne({ where: { identifier } });
    if (existMaterial) return new Error('a material already exists');
    const material = Material.create(createMaterialInput);
    return await Material.save(material);
  }

  @Mutation(() => Material)
  @UseGuards(AuthGuard)
  async removeMaterial(
    @Args('input') removeMaterialInput: RemoveMaterialInput
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
      throw new BadRequestException();
    }
  }
  @Mutation(() => Material)
  @UseGuards(AuthGuard)
  async updateMaterial(
    @Args('input') updateMaterialInput: UpdateMaterialInput
  ) {
    try {
      const identifier = updateMaterialInput.identifier;
      const material = await Material.findOne({
        where: { identifier },
      });
      await Material.update(material.id, {
        ...updateMaterialInput,
      });
      return material;
    } catch (e) {
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
    return Notification.find({ where: { material_id: id } });
  }

  @ResolveField(() => [Message])
  async messages(@Parent() material: Material) {
    const { id } = material;
    return Message.find({ where: { material_id: id } });
  }
}
