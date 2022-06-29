import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './material.entity';
import { MaterialResolver } from './material.resolver';
import { MaterialService } from './material.service';
import { FileService } from '../../file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialResolver, MaterialService, FileService],
})
export class MaterialModule {}
