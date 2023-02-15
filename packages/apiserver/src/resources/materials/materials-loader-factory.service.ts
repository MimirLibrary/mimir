import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Material } from './material.entity';
import { getIdMap } from '../../utils/helpersFunctions/getIdMap';

@Injectable()
export class MaterialsLoaderFactoryService {
  public createMaterialsLoader(): DataLoader<number, Material> {
    return new DataLoader<number, Material>(async (ids: number[]) => {
      const materials = await Material.findByIds(ids);

      const materialsMap: Record<number, Material> = getIdMap(materials);

      return ids.map((id) => materialsMap[id]);
    });
  }
}
