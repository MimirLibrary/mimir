import { BatchHttpLink } from '@apollo/client/link/batch-http';

export const batchingLink = new BatchHttpLink({
  uri: process.env['NX_API_ROOT_URL'] + '/graphql',
  batchMax: 5,
  batchInterval: 20,
});
