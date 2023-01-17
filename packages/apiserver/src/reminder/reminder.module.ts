import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { StatusModule } from '../resources/statuses/status.module';
import { EmailModule } from '../email';

@Module({
  imports: [StatusModule, EmailModule],
  providers: [ReminderService],
  exports: [ReminderService],
})
export class ReminderModule {}
