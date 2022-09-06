import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors }) => {
  const userInfo = JSON.parse(localStorage.getItem('persist:root')!).user;
  const userLocation = JSON.parse(userInfo).location;
  if (graphQLErrors && !Array.isArray(userLocation)) {
    localStorage.removeItem('persist:root');
    window.location.reload();
  }
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
