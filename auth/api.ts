import { createApolloFetch } from 'apollo-fetch';

const urls = {
  development: 'http://localhost:4004/graphqlApi',
  production: 'https://web-configurator.enlitechnology/graphqlApi',
};

export const api = createApolloFetch({
  uri: urls[process.env.NODE_ENV],
});
