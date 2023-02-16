import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { BlockedUsers } from './blocked-users.entity';
import { CreateStateInput } from '@mimir/global-types';
import { SkipBlock } from './skipBlock.decorator';
import { ManagerGuard } from '../../auth/manager.guard';
import { CurrentUser } from '../../auth/current-user';
import { Person } from '../persons/person.entity';
import { checkIsManagerOrMatchingId } from '../../auth/auth-util';

@Resolver()
export class BlockedUsersResolver {
  @Query(() => [BlockedUsers])
  async getBlocksByPerson(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsManagerOrMatchingId(currentUser, +id);
    return await BlockedUsers.find({ where: { person_id: id } });
  }

  @Query(() => BlockedUsers)
  @SkipBlock()
  async getReasonOfBlock(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsManagerOrMatchingId(currentUser, +id);
    return await BlockedUsers.findOne({
      where: { person_id: id },
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => BlockedUsers)
  @UseGuards(ManagerGuard)
  async createState(@Args('input') createStateInput: CreateStateInput) {
    try {
      const state = await BlockedUsers.create(createStateInput);
      await BlockedUsers.save(state);
      return state;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
