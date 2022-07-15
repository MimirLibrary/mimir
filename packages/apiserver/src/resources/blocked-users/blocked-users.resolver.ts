import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { BlockedUsers } from './blocked-users.entity';
import { CreateStateInput } from '@mimir/global-types';

@Resolver()
export class BlockedUsersResolver {
  @Query(() => [BlockedUsers])
  @UseGuards(AuthGuard)
  async getBlocksByPerson(@Args('person_id') id: string) {
    return BlockedUsers.find({ where: { person_id: id } });
  }

  @Mutation(() => BlockedUsers)
  //  @UseGuards(AuthGuard)
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
