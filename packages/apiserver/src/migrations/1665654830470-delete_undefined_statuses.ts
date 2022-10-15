import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteUndefinedStatuses1665654830470
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM material WHERE id NOT IN (SELECT material.id FROM material JOIN status ON (material.id = status.material_id))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
