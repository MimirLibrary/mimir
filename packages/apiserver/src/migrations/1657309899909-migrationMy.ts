import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationMy1657309899909 implements MigrationInterface {
  name = 'migrationMy1657309899909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blocked-users" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "state" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "person_id" integer, CONSTRAINT "PK_3f3f39e45472f6b76d14b4a597e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "position" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "blocked-users" ADD CONSTRAINT "FK_91d69cdcbdfdb9a22172c063186" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocked-users" DROP CONSTRAINT "FK_91d69cdcbdfdb9a22172c063186"`
    );
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "position"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TABLE "blocked-users"`);
  }
}
