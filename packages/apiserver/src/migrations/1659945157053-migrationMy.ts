import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1659945157053 implements MigrationInterface {
  name = 'migrationMy1659945157053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "message" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "message" SET NOT NULL`
    );
  }
}
