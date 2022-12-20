import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './material.entity';
import { MaterialResolver } from './material.resolver';
import { MaterialService } from './material.service';
import { FileService } from '../../file/file.service';
import { MetadataMaterialResolver } from './metadata-material.resolver';
import { DigitalOceanModule } from '@mimir/api-util';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), DigitalOceanModule],
  providers: [
    MaterialResolver,
    MaterialService,
    FileService,
    MetadataMaterialResolver,
  ],
})
export class MaterialModule {}
