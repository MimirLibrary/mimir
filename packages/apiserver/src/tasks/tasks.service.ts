import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_11_30AM)
  handleDailyOverdueEmailNotify() {
    // TODO Here we have to find out which users are overdue for their books, prepare a special html template to send by email (Promise.allSettled).
  }
}
