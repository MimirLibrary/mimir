import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1661339543400 implements MigrationInterface {
  name = 'migrationMy1661339543400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "location_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" ADD "location_id" integer`);
  }
}
