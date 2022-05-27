import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './material.entity';
import { MaterialResolver } from './material.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialResolver],
})
export class MaterialModule {}
