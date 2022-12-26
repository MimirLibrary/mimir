import { Injectable } from '@nestjs/common';
import { Material } from '../resources/materials/material.entity';
import { Like } from 'typeorm';
import { deleteLocalFile, readLocalFile } from '@mimir/helper-functions';
import { DigitalOceanService } from '@mimir/api-util';
import * as process from 'process';

@Injectable()
export class DataTransferService {
  constructor(private digitalOceanService: DigitalOceanService) {}

  async move(): Promise<{ successes: number; errors: number }> {
    const materials: Material[] = await Material.find({
      where: {
        picture: Like(`%${process.env['NX_API_ROOT_URL']}%`),
      },
    });

    let successes = 0,
      errors = 0;
    for (const material of materials) {
      try {
        const file = await readLocalFile(material.picture);
        const url = (await this.digitalOceanService.createFile(file)) as string;
        await Material.update(material.id, { picture: url });
        await deleteLocalFile(material.picture);
        successes++;
      } catch (e) {
        console.error('ERROR:\n', e.message);
        errors++;
      }
    }
    return { successes: successes, errors: errors };
  }
}
