import {Args, Mutation, ResolveField, Resolver} from '@nestjs/graphql';
import {ClaimBookInput, Error, Status, StatusResult} from "@mimir/global-types";
import {Status as StatusType} from '../statuses/status.entity'
import {ItemService} from "./item.service";
import {ClaimError} from "../../errors";

@Resolver('StatusResult')
export class ItemResolver {
  constructor(private bookService: ItemService) {
  }

  @ResolveField()
  __resolveType(value) {
    if (value instanceof StatusType) {
      return 'Status';
    }
    if (value instanceof ClaimError) {
      return 'Error';
    }
    return null;
  }

  @Mutation()
  async claimBook(@Args('input') claimBookInput: ClaimBookInput) {
    try {
      return this.bookService.claim(claimBookInput)
    } catch (e) {
      return {
        message: e.message
      }
    }
  }
}

