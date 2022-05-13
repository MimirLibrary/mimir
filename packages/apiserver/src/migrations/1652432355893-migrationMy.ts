import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1652432355893 implements MigrationInterface {
  name = 'migrationMy1652432355893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD "id_internal" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "UQ_3b0dc43408eb751f3b721b3036b" UNIQUE ("id_internal")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "UQ_3b0dc43408eb751f3b721b3036b"`
    );
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "id_internal"`);
  }
}
