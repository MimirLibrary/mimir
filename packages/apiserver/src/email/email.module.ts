import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ name: 'API_SERVICE', transport: Transport.TCP }]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
