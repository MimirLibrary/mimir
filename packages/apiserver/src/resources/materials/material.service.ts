import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from './material.entity';

@Injectable()
export class MaterialService {

  constructor(@InjectRepository(MaterialEntity) private MaterialEntityRepository: Repository<MaterialEntity>) {
  }
  async getAllMaterials(): Promise<MaterialEntity[]> {
    return await this.MaterialEntityRepository.find()
  }

  async getMaterialById(id: number): Promise<MaterialEntity> {
    const material = await this.MaterialEntityRepository.findOne({ id })
    return material
  }
}