import { Injectable } from '@nestjs/common';
import { Material } from './material.entity';

@Injectable()
export class MaterialService {
  async search(search: string) {
    if (!search) return null;
    const data = await Material.createQueryBuilder('material')
      .where('material.title ILIKE :text', { text: `%${search}%` })
      .orWhere('material.author ILIKE :text', { text: `%${search}%` })
      .getMany();
    return data.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }
}
