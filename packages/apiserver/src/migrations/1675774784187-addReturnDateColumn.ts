import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'return_date';

export class addReturnDateColumn1675774784187 implements MigrationInterface {
  name = 'addReturnDateColumn1675774784187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "status"
      ADD COLUMN "${COLUMN_NAME}" TIMESTAMP NULL`);
    await queryRunner.query(`UPDATE "status"
                             SET "${COLUMN_NAME}" = created_at + INTERVAL '30 days'
                             WHERE "status" IN ('Busy', 'Prolong')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "status" DROP "${COLUMN_NAME}"`);
  }
}
