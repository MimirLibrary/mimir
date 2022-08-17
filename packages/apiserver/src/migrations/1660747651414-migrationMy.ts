import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1660747651414 implements MigrationInterface {
  name = 'migrationMy1660747651414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" ADD "permissions" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "permissions"`);
  }
}
