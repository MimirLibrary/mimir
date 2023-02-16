import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'last_seen_notification_date';

export class addLastSeenNotificationDate1676634022773
  implements MigrationInterface
{
  name = 'addLastSeenNotificationDate1676634022773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" ADD COLUMN "${COLUMN_NAME}" TIMESTAMP NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "${COLUMN_NAME}"`
    );
  }
}
