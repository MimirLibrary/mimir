import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface IEmail {
  from: string;
  to: string;
  subject?: string;
  html?: string;
  template?: string;
  context?: {
    [name: string]: string | number;
  };
}

const EMAIL_SUBJECTS = {
  'return-book-reminder': "Don't forget to return the books!",
} as const;

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: IEmail) {
    try {
      await this.mailService.sendMail({
        to: email.to,
        html: email.html,
        template: email.template,
        context: email.context,
        subject: email.subject || EMAIL_SUBJECTS[email.template] || '',
      });
    } catch (error) {
      Logger.log(error);
    }
  }
}
