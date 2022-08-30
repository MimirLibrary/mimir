import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { queueScheduler } from 'rxjs';
import { validateEmail } from '../validators/email';
import { AppService, IEmail } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/send-email')
  async sendEmail(@Body() email: IEmail, @Res() res: Response) {
    if (!validateEmail(email)) return res.status(404).send();
    queueScheduler.schedule(() => this.appService.sendEmail(email));
    res.status(200).send();
  }
}
