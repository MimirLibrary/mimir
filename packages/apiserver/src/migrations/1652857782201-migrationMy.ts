import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1652857782201 implements MigrationInterface {
  name = 'migrationMy1652857782201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD "picture" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD "title" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD "category" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD "author" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "author"`);
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "picture"`);
  }
}
