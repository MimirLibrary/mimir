import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1661331839993 implements MigrationInterface {
  name = 'migrationMy1661331839993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_15aac71c1a17c2a6abad663790d"`
    );
    await queryRunner.query(
      `CREATE TABLE "person_location" ("person_id" integer NOT NULL, "location_id" integer NOT NULL, CONSTRAINT "PK_7a48ee6628fbea70783364c3a29" PRIMARY KEY ("person_id", "location_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9449dce8c9905e055364cb32b0" ON "person_location" ("person_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_739a99e55e67f905784126d982" ON "person_location" ("location_id") `
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "location_id"`);
    await queryRunner.query(
      `ALTER TABLE "person_location" ADD CONSTRAINT "FK_9449dce8c9905e055364cb32b08" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "person_location" ADD CONSTRAINT "FK_739a99e55e67f905784126d9826" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person_location" DROP CONSTRAINT "FK_739a99e55e67f905784126d9826"`
    );
    await queryRunner.query(
      `ALTER TABLE "person_location" DROP CONSTRAINT "FK_9449dce8c9905e055364cb32b08"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD "location_id" integer NOT NULL`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_739a99e55e67f905784126d982"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9449dce8c9905e055364cb32b0"`
    );
    await queryRunner.query(`DROP TABLE "person_location"`);
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_15aac71c1a17c2a6abad663790d" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
