import { ApolloLink } from '@apollo/client';

export const authLink = new ApolloLink((operation, forward) => {
  const access_token = localStorage.getItem('access_token');
  const id_token = localStorage.getItem('id_token');

  operation.setContext({
    headers: {
      Authorization: `Bearer ${access_token}`,
      'id-token': id_token,
    },
  });
  return forward(operation);
});
