import 'cross-fetch/polyfill';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { authLink } from './links/authLink';
import { errorLink } from './links/errorLink';
import { refreshTokenLink } from './links/refreshTokenLink';
import { batchingLink } from './links/batchingLink';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([refreshTokenLink, authLink, errorLink, batchingLink]),
});
