import express, { Express } from 'express';
import graphqlHTTP from 'express-graphql';
// import { buildSchema } from 'graphql';
// import UserController from './app-data/controller/User.controller';
import db from './app-data/db';
import resolvers from './app-data/graphql/resolver';
import setup from './setup';
import typeDefs from './app-data/graphql/typeDefs';
import { makeExecutableSchema } from 'apollo-server-express';
import getErrorCode from './app-data/graphql/errorCodes';
import cors from 'cors';

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Construct a schema, using GraphQL schema language
/* const schema = buildSchema(`
  type Query {
    hello: String
  }
`); */

// The root provides a resolver function for each API endpoint
/* const root = {
  createUser: async ({ input }) => {
    const { firstName, lastName, email, password } = input;
    const user = new UserController(firstName, lastName, email, password);

    const data = await user.create();

    return data;
  },
  hello: () => {
    return 'Hello world!';
  },
}; */

const app: Express = express();
const port: number = 4004;
const gqlEndpoint: string = '/graphqlApi';

export default async () => {
  app.use(
    express.urlencoded({ extended: true, limit: '10mb' }),
    express.json({ limit: '10mb' })
  );

  app.use(
    gqlEndpoint,
    cors(),
    graphqlHTTP((req) => {
      return {
        schema,
        graphiql: true,
        context: {
          ...req,
          token: req.headers['x-access-token'] || null,
        },
        customFormatErrorFn: (err) => {
          console.log('CUSTOM ERR FN');
          console.log(err);
          console.log('\n');
          const error = getErrorCode(err.message);
          return { message: error.message, statusCode: error.statusCode };
        },
      };
    })
  );

  await db();
  await setup();

  app.listen(port);
  console.log(
    `Running a GraphQL API server at http://localhost:${port}${gqlEndpoint}`
  );
};
