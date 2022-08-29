import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_11_30AM)
  handleCron() {
    this.logger.debug('Called from monday to friday at 11:30AM');
  }
}
