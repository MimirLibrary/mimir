import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationResolver } from './notification.resolver';
import { NotificationsLoaderFactoryService } from './notifications-loader-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationResolver, NotificationsLoaderFactoryService],
  exports: [NotificationsLoaderFactoryService],
})
export class NotificationModule {}
