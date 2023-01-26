import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReminderService } from '../reminder';

@Injectable()
export class SchedulerService {
  constructor(private reminderService: ReminderService) {}

  @Cron('0 * * * *')
  public async sendReturnBookReminders(): Promise<void> {
    await this.reminderService.sendReturnBookReminders();
  }
}
