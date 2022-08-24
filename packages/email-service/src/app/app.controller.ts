import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/sendOverdueNotify')
  async sendOverdueNotify(@Body() receivers: string[], @Res() res: Response) {
    if (!receivers.length) return;
    const sentOk = await this.appService.sendOverdueNotify(receivers);
  }
}
