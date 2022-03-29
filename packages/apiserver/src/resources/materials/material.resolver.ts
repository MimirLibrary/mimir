import { MaterialEntity } from './material.entity';
import { MaterialService } from './material.service';
import { Resolver } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql';

@Resolver()
export class MaterialResorver {
  constructor(private MaterialService: MaterialService) {
  }
  @Query(() => [MaterialEntity], { name: "getAllMaterials" })
  getAllMaterials() {
    return this.MaterialService.getAllMaterials();
  }
}