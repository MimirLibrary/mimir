import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from './messages.entity';
import { CreateMessageInput } from '@mimir/global-types';

@Resolver('MessageUnionResult')
export class MessageResolver {
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
