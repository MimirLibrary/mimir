import { MaterialEntity } from './material.entity';
import { MaterialService } from './material.service';
import { Args, Resolver } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql';

@Resolver()
export class MaterialResorver {
  constructor(private MaterialService: MaterialService) {
  }

  @Query(() => [MaterialEntity])
  getAllMaterials() {
    return this.MaterialService.getAllMaterials();
  }

  @Query(() => MaterialEntity)
  getMaterialById(@Args('id') id: number) {
    return this.MaterialService.getMaterialById(id)
  }
}