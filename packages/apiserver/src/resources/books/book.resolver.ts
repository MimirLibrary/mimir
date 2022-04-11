import {Args, Mutation, ResolveField, Resolver} from '@nestjs/graphql';
import {ClaimBookInput, ErrorMessage, Status, StatusResult} from "@mimir/global-types";
import {BookService} from "./book.service";

@Resolver('StatusResult')
export class BookResolver {
  constructor(private bookService: BookService) {
  }
  @ResolveField()
  __resolveType(value) {
    if (value.status) {
      return 'Status';
    }
    if (value.message) {
      return 'ErrorMessage';
    }
    return null;
  }

  @Mutation('claimBook')
  async claimBook(@Args('input') claimBookInput: ClaimBookInput): Promise<Status | ErrorMessage>  {
    return this.bookService.claimBook(claimBookInput)
  }
}
