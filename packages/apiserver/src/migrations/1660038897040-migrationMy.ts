import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1660038897040 implements MigrationInterface {
  name = 'migrationMy1660038897040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "message" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "message"`);
  }
}
