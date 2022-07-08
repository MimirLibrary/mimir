import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0].message.startsWith('id-token is null')
  ) {
    localStorage.clear();
    window.location.reload();
  }
});
