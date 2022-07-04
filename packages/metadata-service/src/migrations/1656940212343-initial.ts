import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1656940212343 implements MigrationInterface {
  name = 'initial1656940212343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."job_status_enum" AS ENUM('PENDING', 'FOUND', 'MISS')`
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("id" SERIAL NOT NULL, "startedAt" TIMESTAMP NOT NULL, "finisherAt" TIMESTAMP NOT NULL, "status" "public"."job_status_enum" NOT NULL DEFAULT 'PENDING', "meta" jsonb NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")); COMMENT ON COLUMN "job"."startedAt" IS 'Job start time'; COMMENT ON COLUMN "job"."finisherAt" IS 'Job finish time'; COMMENT ON COLUMN "job"."meta" IS 'Various metadata for the job run (url, api, version, etc)'`
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "identifier" character varying NOT NULL, "meta" jsonb NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")); COMMENT ON COLUMN "author"."identifier" IS 'Identifies authors with the same name'; COMMENT ON COLUMN "author"."meta" IS 'Various metadata provided by the Data Source'`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d3962fd11a54d87f927e84d108" ON "author" ("name") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_917eae2bc3f8c7f331573b99c2" ON "author" ("identifier") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_656669a1916c5328ef9d4b656f" ON "author" ("name", "identifier") `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."identifier_idtype_enum" AS ENUM('ISBN-10', 'ISBN-13')`
    );
    await queryRunner.query(
      `CREATE TABLE "identifier" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "idType" "public"."identifier_idtype_enum" NOT NULL, "hits" integer NOT NULL DEFAULT '1', "meta" jsonb NOT NULL, CONSTRAINT "PK_d3d2abb5833f4695e48610f5b6b" PRIMARY KEY ("id")); COMMENT ON COLUMN "identifier"."hits" IS 'Number requests for this Identifier'; COMMENT ON COLUMN "identifier"."meta" IS 'Various metadata provided by the Data Source'`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2541ea00983f9e4ae45b6fe407" ON "identifier" ("value") `
    );
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "identifier" character varying NOT NULL, "meta" jsonb NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id")); COMMENT ON COLUMN "publisher"."identifier" IS 'Identifies publishers with the same name'; COMMENT ON COLUMN "publisher"."meta" IS 'Various metadata provided by the Data Source'`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9dc496f2e5b912da9edd2aa445" ON "publisher" ("name") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cde20cd14c5e361f896da5d597" ON "publisher" ("identifier") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_faaf6b67f1fbeb35ade56a7523" ON "publisher" ("name", "identifier") `
    );
    await queryRunner.query(
      `CREATE TABLE "material" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "yearPublishedAt" smallint NOT NULL, "monthPublishedAt" smallint NOT NULL, "cover" character varying NOT NULL, "meta" jsonb NOT NULL, "publisherId" integer, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id")); COMMENT ON COLUMN "material"."yearPublishedAt" IS 'Year published'; COMMENT ON COLUMN "material"."monthPublishedAt" IS 'Month published'; COMMENT ON COLUMN "material"."meta" IS 'Various metadata provided by the Data Source'`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a22d20cb26a24fac4e8736d4d4" ON "material" ("title") `
    );
    await queryRunner.query(
      `CREATE TABLE "material_authors_author" ("materialId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_b5eb0ffa26aa1fdb8a37fd0a639" PRIMARY KEY ("materialId", "authorId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1be5dfe41c5ca23df7871dc7a1" ON "material_authors_author" ("materialId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3789072432a820f9d1cd2edfff" ON "material_authors_author" ("authorId") `
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "FK_f4be989bb1ce3ff26f206907af8" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_authors_author" ADD CONSTRAINT "FK_1be5dfe41c5ca23df7871dc7a17" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "material_authors_author" ADD CONSTRAINT "FK_3789072432a820f9d1cd2edfff0" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material_authors_author" DROP CONSTRAINT "FK_3789072432a820f9d1cd2edfff0"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_authors_author" DROP CONSTRAINT "FK_1be5dfe41c5ca23df7871dc7a17"`
    );
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "FK_f4be989bb1ce3ff26f206907af8"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3789072432a820f9d1cd2edfff"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1be5dfe41c5ca23df7871dc7a1"`
    );
    await queryRunner.query(`DROP TABLE "material_authors_author"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a22d20cb26a24fac4e8736d4d4"`
    );
    await queryRunner.query(`DROP TABLE "material"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_faaf6b67f1fbeb35ade56a7523"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cde20cd14c5e361f896da5d597"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9dc496f2e5b912da9edd2aa445"`
    );
    await queryRunner.query(`DROP TABLE "publisher"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2541ea00983f9e4ae45b6fe407"`
    );
    await queryRunner.query(`DROP TABLE "identifier"`);
    await queryRunner.query(`DROP TYPE "public"."identifier_idtype_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_656669a1916c5328ef9d4b656f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_917eae2bc3f8c7f331573b99c2"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d3962fd11a54d87f927e84d108"`
    );
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "job"`);
    await queryRunner.query(`DROP TYPE "public"."job_status_enum"`);
  }
}
