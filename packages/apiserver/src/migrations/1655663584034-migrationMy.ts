import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1655663584034 implements MigrationInterface {
  name = 'migrationMy1655663584034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "material" ADD "location_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "FK_7e5c3c610f5289d3f46f5ef941d" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "FK_7e5c3c610f5289d3f46f5ef941d"`
    );
    await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "location_id"`);
  }
}
