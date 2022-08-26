import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class AppService {
  transporter: ReturnType<typeof createTransport>;

  constructor() {
    console.log(process.env.NODE_ENV);
    this.transporter = createTransport({
      host: 'localhost',
    });
  }

  getData(): { message: string } {
    return { message: 'Welcome to email-service!' };
  }

  async sendOverdueNotify(receivers: string[]): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: '"Mimir App" <app@mimirapp.xyz>',
        to: receivers.join(', '),
        subject: 'Overdue books | Mimir App',
        text: 'Test message',
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
