import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { authLink } from './links/authLink';
import { errorLink } from './links/errorLink';
import { refreshTokenLink } from './links/refreshTokenLink';

const httpLink = new HttpLink({
  uri: process.env['NX_API_ROOT_URL'] + '/graphql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([refreshTokenLink, authLink, errorLink, httpLink]),
});
