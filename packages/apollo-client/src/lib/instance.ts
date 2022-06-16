import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env['NX_API_ROOT_URL'] + '/graphql',
  cache: new InMemoryCache(),
});
