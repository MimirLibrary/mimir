import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import {
  ClaimBookInput,
  ReturnDate,
  ClaimBookUnionResult,
  Error,
} from '@mimir/global-types';
import { ItemService } from './item.service';

@Resolver('ClaimBookUnionResult')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @ResolveField()
  __resolveType(value) {
    if (value.returnDate) {
      return 'ReturnDate';
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
