import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1657919176160 implements MigrationInterface {
  name = 'migrationMy1657919176160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" ADD "location_id" integer NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "location_id"`);
  }
}
