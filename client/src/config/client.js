import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://18.235.249.167:4000/',
  cache: new InMemoryCache({
  })
});

export default client;