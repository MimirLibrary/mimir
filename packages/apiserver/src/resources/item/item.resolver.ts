import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookInput, ProlongTimeInput } from '@mimir/global-types';
import { ItemService } from './item.service';
import { Status } from '../statuses/status.entity';

class ItemError {
  constructor(public message: string) {}
}

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
  async claimBook(
    @Args('input') claimBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.claim(claimBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
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
  async prolongClaimPeriod(
    @Args('input') prolongInput: ProlongTimeInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.prolong(prolongInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Mutation(() => Status)
  async returnItem(
    @Args('input') returnBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.putOnShelf(returnBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Mutation(() => Status)
  async rejectItem(
    @Args('input') returnBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.reject(returnBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }
}
