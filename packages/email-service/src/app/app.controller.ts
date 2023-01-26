import { Controller } from '@nestjs/common';
import { queueScheduler } from 'rxjs';
import { validateEmail } from '../validators/validateEmail';
import { AppService, IEmail } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send-email')
  sendEmail(@Payload() email: IEmail): void {
    if (!validateEmail(email)) {
      return;
    }
    queueScheduler.schedule(() => this.appService.sendEmail(email));
  }
}
