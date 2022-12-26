import { Injectable } from '@nestjs/common';
import { Material } from '../resources/materials/material.entity';
import { Like } from 'typeorm';
import { DigitalOceanService } from '@mimir/api-util';
import * as process from 'process';
import { DataTransferOut } from './data-transfer';
import { FileService } from '../file/file.service';

@Injectable()
export class DataTransferService {
  constructor(
    private digitalOceanService: DigitalOceanService,
    private fileService: FileService
  ) {}

  async move(): Promise<DataTransferOut> {
    const materials: Material[] = await Material.find({
      where: {
        picture: Like(`${process.env['NX_API_ROOT_URL']}%`),
      },
    });

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

  private async transferFile(material: Material) {
    const file = await this.fileService.readFile(material.picture);
    const url = (await this.digitalOceanService.createFile(file)) as string;
    await Material.update(material.id, { picture: url });
    await this.fileService.removeFile(material.picture);
  }
}
