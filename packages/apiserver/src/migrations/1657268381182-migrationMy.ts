import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1657268381182 implements MigrationInterface {
  name = 'migrationMy1657268381182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" ADD "username" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "avatar" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "username"`);
  }
}
