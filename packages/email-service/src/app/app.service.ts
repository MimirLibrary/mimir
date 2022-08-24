import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class AppService {
  transporter: ReturnType<typeof createTransport>;

  constructor() {
    this.transporter = createTransport({
      host:
        process.env.NODE_ENV === 'local' ? 'smtp.mimirapp.xyz' : 'localhost',
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
        subject: 'Overdue List | Mimir App',
        text: 'Is it works?',
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
