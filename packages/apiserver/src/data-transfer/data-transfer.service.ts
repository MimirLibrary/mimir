import { Injectable } from '@nestjs/common';
import { Material } from '../resources/materials/material.entity';
import { DigitalOceanService } from '@mimir/api-util';
import * as process from 'process';
import { DataTransferOut } from './data-transfer';
import axios from 'axios';

@Injectable()
export class DataTransferService {
  constructor(private digitalOceanService: DigitalOceanService) {}

  async move(): Promise<DataTransferOut> {
    const materials: Material[] = await Material.createQueryBuilder()
      .where(`picture IS NOT NULL`)
      .andWhere(`picture NOT LIKE '${process.env['NX_API_SPACES']}%'`)
      .getMany();

    let successes = 0;
    let errors = 0;
    for (const material of materials) {
      try {
        await this.transferFile(material);
        successes++;
      } catch (e) {
        console.error(
          'ERROR: An error occurred during file transfer.\nDetails: ',
          e.message
        );
        errors++;
      }
    }
    return { successes: successes, errors: errors };
  }

  private async transferFile(material: Material): Promise<void> {
    const picture = await axios.get(material.picture, {
      responseType: 'arraybuffer',
    });
    const url = await this.digitalOceanService.createFile({
      originalname: material.picture,
      buffer: picture.data,
      mimetype: picture.headers['content-type'],
    });
    await Material.update(material.id, {
      originalPicture: material.picture,
      picture: url as string,
    });
  }
}
