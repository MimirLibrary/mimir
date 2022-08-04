import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookInput, ProlongTimeInput } from '@mimir/global-types';
import { ItemService } from './item.service';
import { Status } from '../statuses/status.entity';

@Resolver('BookUnionResult')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @ResolveField()
  __resolveType(value) {
    if (value.status) {
      return 'Status';
    }
    if (value.message) {
      return 'Error';
    }
    return null;
  }

  @Mutation(() => Status)
  async claimBook(@Args('input') claimBookInput: BookInput) {
    return this.itemService.claim(claimBookInput);
  }

  @Query(() => [Status])
  async getAllTakenItems(@Args('person_id') person_id: number) {
    return this.itemService.getAllTakenItems(person_id);
  }

  @Query(() => [Status])
  async getItemsForClaimHistory(@Args('person_id') person_id: number) {
    return this.itemService.getItemsForClaimHistory(person_id);
  }

  @Mutation(() => Status)
  async prolongClaimPeriod(@Args('input') prolongInput: ProlongTimeInput) {
    return this.itemService.prolong(prolongInput);
  }

  @Mutation(() => Status)
  async returnItem(@Args('input') returnBookInput: BookInput) {
    return this.itemService.return(returnBookInput);
  }

  @Mutation(() => Status)
  async rejectItem(@Args('input') returnBookInput: BookInput) {
    return this.itemService.reject(returnBookInput);
  }
}
