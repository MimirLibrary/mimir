import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  useSendMailTransport: process.env.EMAIL_USE_SEND_MAIL_TRANSPORT,
}));
