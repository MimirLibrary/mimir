import { Injectable } from '@nestjs/common';
import { Material } from './material.entity';
import { SearchInput } from '@mimir/global-types';

@Injectable()
export class MaterialService {
  async search(searchInput: SearchInput) {
    const { search, location } = searchInput;
    if (!search) return null;
    const data = await Material.createQueryBuilder('material')
      .leftJoinAndSelect('material.location', 'location')
      .where(
        'location.location = :location ' +
          'AND (material.title ILIKE :text OR material.author ILIKE :text)',
        { location, text: `%${search}%` }
      )
      .getMany();
    return data.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }
}
