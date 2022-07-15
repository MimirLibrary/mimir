import { Module } from '@nestjs/common';
import { BlockedUsersResolver } from './blocked-users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers } from './blocked-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedUsers])],
  providers: [BlockedUsersResolver],
})
export class BlockedUsersModule {}
