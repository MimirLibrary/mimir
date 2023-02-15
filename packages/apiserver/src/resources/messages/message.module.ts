import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageResolver } from './message.resolver';
import { MessagesLoaderFactoryService } from './messages-loader-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageResolver, MessagesLoaderFactoryService],
  exports: [MessagesLoaderFactoryService],
})
export class MessageModule {}
