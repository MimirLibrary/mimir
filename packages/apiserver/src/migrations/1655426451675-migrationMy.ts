import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1655426451675 implements MigrationInterface {
  name = 'migrationMy1655426451675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "material_id" integer, "person_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("id" SERIAL NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "person" ADD "location_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_6b239a43692a62bd597f27b4f0d" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_9d46d510fc2c70b0dca34a95189" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_15aac71c1a17c2a6abad663790d" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_15aac71c1a17c2a6abad663790d"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_9d46d510fc2c70b0dca34a95189"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_6b239a43692a62bd597f27b4f0d"`
    );
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "location_id"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TABLE "notification"`);
  }
}
