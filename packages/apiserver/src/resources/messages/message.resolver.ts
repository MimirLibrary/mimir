import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from './message.entity';
import { CreateMessageInput } from '@mimir/global-types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

@Resolver('MessageUnionResult')
export class MessageResolver {
  @Query(() => [Message])
  @UseGuards(AuthGuard)
  async getMessagesByPerson(@Args('person_id') id: string) {
    return Message.find({ where: { person_id: id } });
  }

  @ResolveField()
  __resolveType(value) {
    if (value.title) {
      return 'Message';
    }
    if (value.message) {
      return 'Error';
    }
    return null;
  }

  @Mutation(() => Message)
  @UseGuards(AuthGuard)
  async createMessageForManager(
    @Args('input') createMessageInput: CreateMessageInput
  ) {
    try {
      const message = Message.create(createMessageInput);
      return Message.save(message);
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
