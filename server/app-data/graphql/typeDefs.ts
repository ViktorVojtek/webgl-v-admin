import { gql } from 'apollo-server-express';

export default gql`
  input UserDataInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input UserDataLoginInput {
    email: String
    password: String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    token: String
  }

  type Query {
    auth: User
    hello: String
  }

  type Mutation {
    createUser(input: UserDataInput): User
    loginUser(input: UserDataLoginInput): User
  }
`;
