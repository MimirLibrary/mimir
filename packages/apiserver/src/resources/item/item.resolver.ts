import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookInput, ProlongTimeInput } from '@mimir/global-types';
import { Error } from '@mimir/global-types';
import { ItemService } from './item.service';
import { Status } from '../statuses/status.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async claimBook(@Args('input') claimBookInput: BookInput) {
    return this.itemService.claim(claimBookInput);
  }

  @Query(() => [Status])
  @UseGuards(AuthGuard)
  async getAllTakenItems(@Args('person_id') person_id: number) {
    return this.itemService.getAllTakenItems(person_id);
  }

  @Mutation(() => Status)
  @UseGuards(AuthGuard)
  async prolongClaimPeriod(@Args('input') prolongInput: ProlongTimeInput) {
    return this.itemService.prolong(prolongInput);
  }

  @Mutation(() => Status)
  @UseGuards(AuthGuard)
  async returnItem(@Args('input') returnBookInput: BookInput) {
    return this.itemService.return(returnBookInput);
  }
}
