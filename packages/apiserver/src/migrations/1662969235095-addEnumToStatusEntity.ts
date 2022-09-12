import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnumToStatusEntity1662969235095 implements MigrationInterface {
  name = 'addEnumToStatusEntity1662969235095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."status_status_enum" AS ENUM('Free', 'Busy', 'Prolong', 'Pending', 'SUSPEND', 'Rejected', 'Overdue')`
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "status" "public"."status_status_enum" NOT NULL`
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
