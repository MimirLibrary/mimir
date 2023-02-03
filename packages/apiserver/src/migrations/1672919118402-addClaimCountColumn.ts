import { MigrationInterface, QueryRunner } from 'typeorm';
import { StatusTypes } from '@mimir/global-types';

const COLUMN_NAME = 'claim_count';

export class addClaimCountColumn1672919118402 implements MigrationInterface {
  name = 'addClaimCountColumn1672919118402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "material"
      ADD COLUMN "claim_count" INTEGER NOT NULL DEFAULT 0`);
    await queryRunner.query(`UPDATE "material" m
                             set "${COLUMN_NAME}" =
                                   (SELECT COUNT(*)
                                    FROM "status" s
                                    WHERE s.material_id = m.id
                                      AND s.status = '${StatusTypes.BUSY}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "material" DROP "${COLUMN_NAME}"`);
  }
}
