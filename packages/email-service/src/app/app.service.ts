import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { Logger } from '@nestjs/common';

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

  async sendEmail(email: IEmail) {
    try {
      await this.transporter.sendMail(email);
    } catch (error) {
      Logger.log(error);
    }
  }
}
