import { MigrationInterface, QueryRunner } from 'typeorm';
import { Material } from '../resources/materials/material.entity';

export class normalizeColumnISBN1663580664088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const materialRepo = await queryRunner.manager.getRepository(Material);
    await materialRepo.query(
      "UPDATE material SET identifier = REPLACE(identifier, '-', '')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
