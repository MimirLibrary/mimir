import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller()
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @MessagePattern('createMaterial')
  create(@Payload() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @MessagePattern('findAllMaterials')
  findAll() {
    return this.materialsService.findAll();
  }

  @MessagePattern('findOneMaterial')
  findOne(@Payload() id: number) {
    return this.materialsService.findOne(id);
  }

  @MessagePattern('updateMaterial')
  update(@Payload() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(
      updateMaterialDto.id,
      updateMaterialDto
    );
  }

  @MessagePattern('removeMaterial')
  remove(@Payload() id: number) {
    return this.materialsService.remove(id);
  }
}
