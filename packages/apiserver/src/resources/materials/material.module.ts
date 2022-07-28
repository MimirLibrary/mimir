import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './material.entity';
import { MaterialResolver } from './material.resolver';
import { MaterialService } from './material.service';
import { FileService } from '../../file/file.service';
import { MetadataMaterialResolver } from './metadata-material.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [
    MaterialResolver,
    MaterialService,
    FileService,
    MetadataMaterialResolver,
  ],
})
export class MaterialModule {}
