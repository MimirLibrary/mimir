import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

export interface IEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class AppService {
  private transporter: ReturnType<typeof createTransport>;

  constructor() {
    this.transporter = createTransport({
      host: 'localhost',
    });
  }

  getData(): { message: string } {
    return { message: 'Welcome to email-service!' };
  }

  async sendEmail(email: IEmail) {
    try {
      await this.transporter.sendMail(email);
    } catch (error) {
      console.log(error);
    }
  }
}
