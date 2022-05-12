import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1652354926155 implements MigrationInterface {
  name = 'migrationMy1652354926155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD "id_internal" integer NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "id_internal"`);
  }
}
