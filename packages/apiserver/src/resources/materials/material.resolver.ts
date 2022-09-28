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
  SearchOneMaterial,
} from '@mimir/global-types';
import { Notification } from '../notifications/notification.entity';
import { MaterialService } from './material.service';
import { BadRequestException } from '@nestjs/common';
import { Message } from '../messages/message.entity';
import { GraphQLError } from 'graphql';
import { normalizeIdentifier } from '@mimir/helper-functions';

@Resolver('Material')
export class MaterialResolver {
  constructor(private materialService: MaterialService) {}

  @Query(() => [Material])
  async getAllMaterials(
    @Args('locations') locations: Array<number>,
    @Args('limit') limit: number,
    @Args('offset') offset: number
  ) {
    return this.materialService.allMaterials(locations, limit, offset);
  }

  @Query(() => Material)
  async getMaterialById(@Args('id') id: number | string) {
    return Material.findOneOrFail(id, { relations: ['location'] });
  }

  @Query(() => Material)
  async getMaterialByIdentifier(
    @Args('input') searchOneMaterial: SearchOneMaterial
  ) {
    try {
      const { identifier, locations } = searchOneMaterial;
      const updateIdentifier = normalizeIdentifier(identifier);
      const material = await Material.createQueryBuilder('material')
        .where('material.identifier = :identifier', {
          identifier: updateIdentifier,
        })
        .andWhere('material.location_id IN (:...locations)', { locations })
        .getOne();
      if (!material) {
        throw new Error("Material doesn't exist!");
      }
      return material;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  @Query(() => [Material])
  async searchOfMaterials(@Args('input') searchInput: SearchInput) {
    return this.materialService.search(searchInput);
  }

  @Query(() => [Material])
  async getAllDonatedMaterialsByPerson(@Args('id') id: number | string) {
    return this.materialService.getAllDonatedMaterialsByPerson(id);
  }

  @Mutation(() => Material)
  async donateBook(@Args('input') donateBookInput: DonateBookInput) {
    return this.materialService.donate(donateBookInput);
  }

  @Mutation(() => Material)
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
  async updateMaterial(
    @Args('input') updateMaterialInput: UpdateMaterialInput
  ) {
    try {
      const identifier = normalizeIdentifier(updateMaterialInput.identifier);
      const material = await Material.findOne({
        where: { identifier },
      });
      await Material.update(material.id, {
        ...updateMaterialInput,
        identifier: normalizeIdentifier(identifier),
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
