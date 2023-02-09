import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'claim_duration';

export class addClaimDurationColumn1675949345479 implements MigrationInterface {
  name = 'addClaimDurationColumn1675949345479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `AlTER TABLE "material" ADD COLUMN "${COLUMN_NAME}" INTEGER NOT NULL DEFAULT 30 CHECK ("${COLUMN_NAME}" >= 1)`
    );
    await queryRunner.query(
      `AlTER TABLE "material" ALTER COLUMN "${COLUMN_NAME}" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "material" DROP "${COLUMN_NAME}"`);
  }
}
