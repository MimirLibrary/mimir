import { MigrationInterface, QueryRunner } from 'typeorm';
import { Material } from '../resources/materials/material.entity';

export class normalizeColumnISBN1663580664088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const materialRepo = await queryRunner.connection.getRepository(Material);
    const allMaterials = await materialRepo.find();
    const updateMaterials = allMaterials.map((material) => {
      if (material.identifier.includes('-')) {
        const updateMaterial = {
          ...material,
          identifier: material.identifier.replaceAll('-', ''),
        };
        return materialRepo.save(updateMaterial);
      }
      return material;
    });

    await Promise.all(updateMaterials);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
