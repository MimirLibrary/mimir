import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnumToStatusEntity1663058319742 implements MigrationInterface {
  name = 'addEnumToStatusEntity1663058319742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."status_status_enum" AS ENUM('Free', 'Busy', 'Prolong', 'Pending', 'SUSPEND', 'Rejected', 'Overdue')`
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "status" "public"."status_status_enum" NOT NULL DEFAULT 'Free'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."status_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD "status" character varying NOT NULL`
    );
  }
}
