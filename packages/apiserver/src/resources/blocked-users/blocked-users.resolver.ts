import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { BlockedUsers } from './blocked-users.entity';

@Resolver()
export class BlockedUsersResolver {
  @Query(() => [BlockedUsers])
  @UseGuards(AuthGuard)
  async getBlocksByPerson(@Args('person_id') id: string) {
    return BlockedUsers.find({ where: { person_id: id } });
  }
}
