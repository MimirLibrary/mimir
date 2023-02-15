import { Module } from '@nestjs/common';
import { BlockedUsersResolver } from './blocked-users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers } from './blocked-users.entity';
import { BlockedUsersLoaderFactoryService } from './blocked-users-loader-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedUsers])],
  providers: [BlockedUsersResolver, BlockedUsersLoaderFactoryService],
  exports: [BlockedUsersLoaderFactoryService],
})
export class BlockedUsersModule {}
