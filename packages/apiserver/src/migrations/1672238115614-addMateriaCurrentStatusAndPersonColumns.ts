import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMaterialCurrentStatusAndPersonColumns1672238115614
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `AlTER TABLE "material"
        ADD COLUMN "current_status_id" INTEGER,
        ADD CONSTRAINT "fk_material_current_status" FOREIGN KEY ("current_status_id") REFERENCES "status"("id")`
    );
    await queryRunner.query(`UPDATE "material"
                             set current_status_id = material_current_status.current_status_id FROM
                                    (SELECT m.id as id,
                                    s1.id as current_status_id
                              FROM material m
                                     INNER JOIN status s1 ON s1.material_id = m.id
                                     LEFT JOIN status s2 on s2.material_id = m.id AND s1.id < s2.id
                              WHERE s2.id IS NULL) as material_current_status
                             WHERE "material".id = material_current_status.id`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "material" DROP "current_status_id"`);
  }
}
