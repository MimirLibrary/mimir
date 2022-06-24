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
import { Message } from '../messages/messages.entity';
import { MaterialService } from './material.service';

@Resolver('Material')
export class MaterialResolver {
  constructor(private materialService: MaterialService) {}

  @Query(() => [Material])
  async getAllMaterials() {
    return Material.find();
  }

  @Query(() => Material)
  async getMaterialById(@Args('id') id: number | string) {
    return Material.findOneOrFail(id);
  }

  // @Mutation(() => Material)
  // async donateBook(){
  //   return this.materialService.donate()
  // }

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
