import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1656091281882 implements MigrationInterface {
  name = 'migrationMy1656091281882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD "description" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "description"`);
  }
}
