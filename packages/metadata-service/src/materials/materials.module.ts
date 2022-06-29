import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
