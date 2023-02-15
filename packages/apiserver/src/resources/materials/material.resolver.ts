import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Material } from './material.entity';
import { Status } from '../statuses/status.entity';
import {
  CreateMaterialInput,
  DonateBookInput,
  RemoveMaterialInput,
  RolesTypes,
  SearchInput,
  SearchOneMaterial,
  UpdateMaterialInput,
} from '@mimir/global-types';
import { Notification } from '../notifications/notification.entity';
import { MaterialService } from './material.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Message } from '../messages/message.entity';
import { GraphQLError } from 'graphql';
import { normalizeIdentifier } from '@mimir/helper-functions';
import { CurrentUser } from '../../auth/current-user';
import { Person } from '../persons/person.entity';
import * as DataLoader from 'dataloader';
import DataLoaderType from '../../data-loader-type';
import { ManagerGuard } from '../../auth/manager.guard';
import { checkIsManagerOrMatchingId } from '../../auth/auth-util';

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
  async searchOfMaterials(
    @Args('input') searchInput: SearchInput,
    @CurrentUser() user: Person
  ) {
    return this.materialService.search(
      searchInput,
      user.type === RolesTypes.MANAGER
    );
  }

  @Query(() => [Material])
  async getAllDonatedMaterialsByPerson(
    @Args('id') id: number | string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsManagerOrMatchingId(currentUser, +id);
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
  @UseGuards(ManagerGuard)
  async removeMaterial(
    @Args('input') removeMaterialInput: RemoveMaterialInput
  ) {
    const identifier = removeMaterialInput.identifier;
    return await this.materialService.deleteMaterial(identifier);
  }

  @Mutation(() => Material)
  @UseGuards(ManagerGuard)
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
  async statuses(
    @Parent() material: Material,
    @Context(DataLoaderType.materialsStatusesLoader)
    materialsStatusesLoader: DataLoader<number, Status[]>
  ) {
    const { id } = material;
    return materialsStatusesLoader.load(id);
  }

  @ResolveField(() => [Notification])
  async notifications(
    @Parent() material: Material,
    @Context(DataLoaderType.materialsNotificationsLoader)
    materialNotificationsLoader: DataLoader<number, Notification[]>
  ) {
    const { id } = material;
    return materialNotificationsLoader.load(id);
  }

  @ResolveField(() => [Message])
  async messages(
    @Parent() material: Material,
    @Context(DataLoaderType.materialsMessagesLoader)
    materialsMessagesLoader: DataLoader<number, Message[]>
  ) {
    const { id } = material;
    return materialsMessagesLoader.load(id);
  }

  @ResolveField(() => Status)
  async currentStatus(
    @Parent() material: Material,
    @Context(DataLoaderType.statusesLoader)
    statusesLoader: DataLoader<number, Status>
  ): Promise<Status> {
    if (!material?.currentStatusId) {
      return null;
    }
    return statusesLoader.load(material.currentStatusId);
  }
}
