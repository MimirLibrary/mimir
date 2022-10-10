import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  welcome() {
    return 'Hello, Graphql';
  }
}
