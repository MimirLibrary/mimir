import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0].message.startsWith('id-token is null')
  ) {
    localStorage.clear();
    window.location.reload();
  } else if (
    graphQLErrors &&
    graphQLErrors[0].message.startsWith('user is blocked')
  ) {
    window.location.replace('/block');
  }
});
