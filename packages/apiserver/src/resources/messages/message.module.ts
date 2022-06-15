import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessageResolver } from './messages.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageResolver],
})
export class NotificationModule {}
