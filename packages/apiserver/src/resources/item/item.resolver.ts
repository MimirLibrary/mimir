import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import {
  ClaimBookInput,
  Error,
  Status,
  StatusResult,
} from '@mimir/global-types';
import { Status as StatusType } from '../statuses/status.entity';
import { ItemService } from './item.service';

@Resolver('StatusResult')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @ResolveField()
  __resolveType(value) {
    if (value instanceof StatusType) {
      return 'Status';
    }
    if (value.message) {
      return 'Error';
    }
    return null;
  }

  @Mutation()
  async claimBook(@Args('input') claimBookInput: ClaimBookInput) {
    return this.itemService.claim(claimBookInput);
  }
}
