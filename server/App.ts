import express, { Express } from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app: Express = express();
const port: number = 4004;
const gqlEndpoint: string = '/graphqlApi';

export default () => {
  app.use(
    gqlEndpoint,
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
  app.listen(port);
  console.log(
    `Running a GraphQL API server at http://localhost:${port}${gqlEndpoint}`
  );
};
