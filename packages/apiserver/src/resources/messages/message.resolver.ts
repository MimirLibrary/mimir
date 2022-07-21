import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from './message.entity';
import { CreateMessageInput } from '@mimir/global-types';

@Resolver('MessageUnionResult')
export class MessageResolver {
  @Query(() => [Message])
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
