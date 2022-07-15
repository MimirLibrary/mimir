import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1657842353396 implements MigrationInterface {
  name = 'migrationMy1657842353396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocked-users" ALTER COLUMN "description" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocked-users" ALTER COLUMN "description" SET NOT NULL`
    );
  }
}
