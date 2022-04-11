import {Args, Mutation, ResolveField, Resolver} from '@nestjs/graphql';
import {ClaimBookInput, Error, Status, StatusResult} from "@mimir/global-types";
import {Status as StatusType} from '../statuses/status.entity'
import {BookService} from "./book.service";
import {ClaimError} from "../../errors";

@Resolver('StatusResult')
export class BookResolver {
  constructor(private bookService: BookService) {
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
  async claimBook(@Args('input') claimBookInput: ClaimBookInput): Promise<StatusResult>  {
    return this.bookService.claim(claimBookInput)
  }
}
