import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/send-overdue-notify')
  async sendOverdueNotify(@Body() receivers: string[], @Res() res: Response) {
    if (!receivers.length) return res.status(404).send();
    const sentOk = await this.appService.sendOverdueNotify(receivers);
    if (!sentOk) return res.status(404).send();
    res.status(200).send();
  }
}
