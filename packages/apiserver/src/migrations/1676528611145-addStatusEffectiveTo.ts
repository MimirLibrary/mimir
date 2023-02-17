import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'effective_to';

export class addStatusEffectiveTo1676528611145 implements MigrationInterface {
  name = 'addStatusEffectiveTo1676528611145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status"
      ADD COLUMN "${COLUMN_NAME}" TIMESTAMP NULL`);
    await queryRunner.query(`UPDATE "status"
                             set "effective_to" = "sub"."next_created_at" FROM (SELECT  "id", LEAD("created_at") OVER (PARTITION BY "material_id" ORDER BY "created_at" ASC) AS "next_created_at" FROM "status") AS "sub"
                             WHERE "sub"."id" = "status"."id";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" DROP COLUMN "${COLUMN_NAME}"`
    );
  }
}
