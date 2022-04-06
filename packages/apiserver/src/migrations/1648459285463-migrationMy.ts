import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationMy1648459285463 implements MigrationInterface {
    name = 'migrationMy1648459285463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "material"
        (
          "id" SERIAL NOT NULL,
          "identifier" character varying NOT NULL,
          "id_type" character varying NOT NULL,
          "type" character varying NOT NULL,
          "location" character varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
           CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "status"
        (
          "id" SERIAL NOT NULL,
          "status" character varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "material_id" integer,
          "person_id" integer,
           CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "person"
        (
          "id" SERIAL NOT NULL,
          "smg_id" character varying NOT NULL,
          "type" character varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `ALTER TABLE "status"
                 ADD CONSTRAINT "FK_e58332a1b72ef781d05eece3a71"
                 FOREIGN KEY ("material_id")
                 REFERENCES "material"("id")
                 ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(
          `ALTER TABLE "status"
                 ADD CONSTRAINT "FK_dab4706ce6440c090ee89616d9e"
                 FOREIGN KEY ("person_id")
                 REFERENCES "person"("id")
                 ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_dab4706ce6440c090ee89616d9e"`);
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_e58332a1b72ef781d05eece3a71"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "material"`);
    }

}
