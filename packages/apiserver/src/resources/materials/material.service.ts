import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from './material.entity';

@Injectable()
export class MaterialService {
  constructor(@InjectRepository(MaterialEntity) private MaterialRepository: Repository<MaterialEntity>) {
  }
  getAllMaterials() {
    return this.MaterialRepository.find()
  }
}