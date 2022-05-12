import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1652357343481 implements MigrationInterface {
  name = 'migrationMy1652357343481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "UQ_3b0dc43408eb751f3b721b3036b" UNIQUE ("id_internal")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "UQ_3b0dc43408eb751f3b721b3036b"`
    );
  }
}
