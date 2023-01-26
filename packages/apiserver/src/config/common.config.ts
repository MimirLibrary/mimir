import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  periodOfKeeping: process.env.NX_PERIOD_OF_KEEPING,
  reminderPeriod: process.env.REMINDER_PERIOD,
  frontendUrl: process.env.FRONTEND_URL,
}));
