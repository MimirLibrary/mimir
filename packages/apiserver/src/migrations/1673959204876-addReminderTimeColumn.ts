import { MigrationInterface, QueryRunner } from 'typeorm';

const COLUMN_NAME = 'last_reminder_time';

export class addLastReminderTimeColumn1673959204876
  implements MigrationInterface
{
  name = 'addLastReminderTimeColumn1673959204876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "status"
      ADD COLUMN "${COLUMN_NAME}" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`AlTER TABLE "status" DROP "${COLUMN_NAME}"`);
  }
}
