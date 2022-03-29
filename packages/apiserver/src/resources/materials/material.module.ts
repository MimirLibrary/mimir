import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialEntity } from './material.entity';
import { MaterialService } from './material.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity])],
  providers: [MaterialService]
})
export class MaterialModule { }
