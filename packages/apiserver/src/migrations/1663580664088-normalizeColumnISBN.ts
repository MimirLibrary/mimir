import { MigrationInterface, QueryRunner } from 'typeorm';
import { Material } from '../resources/materials/material.entity';

export class normalizeColumnISBN1663580664088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const materialRepo = await queryRunner.manager.getRepository(Material);
    const materialsData = await materialRepo.query(
      'SELECT id,identifier FROM material'
    );

    if (!materialsData.length) return;

    const updateMaterials = materialsData.map((item) => {
      if (item.identifier.includes('-')) {
        return materialRepo.update(item.id, {
          identifier: item.identifier.replaceAll('-', ''),
        });
      }
      return item;
    });

    await Promise.all(updateMaterials);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
