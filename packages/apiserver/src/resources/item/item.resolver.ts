import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  ClaimBookInput,
  Error,
  Status,
  StatusResult,
} from '@mimir/global-types';
import { Status as StatusType } from '../statuses/status.entity';
import { ItemService } from './item.service';
import { Material } from '../materials/material.entity';

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

  @Query(() => [StatusType])
  async getAllTakenItems(@Args('person_id') person_id: number) {
    return this.itemService.getAllTakenItems(person_id);
  }
}
