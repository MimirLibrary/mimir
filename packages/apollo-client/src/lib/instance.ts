import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // uri: process.env['NX_API_ROOT_URL'] + '/graphql',
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache(),
});
