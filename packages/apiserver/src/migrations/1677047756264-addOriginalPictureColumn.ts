import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'original_picture';

export class addOriginalPictureColumn1677047756264
  implements MigrationInterface
{
  name = 'addOriginalPictureColumn1677047756264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" ADD COLUMN "${COLUMN_NAME}" CHARACTER VARYING`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "material" DROP COLUMN "${COLUMN_NAME}"`
    );
  }
}
