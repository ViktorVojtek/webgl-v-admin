import gql from 'graphql-tag';

export const ALL_CHARACTERS = gql`
  query allCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

export const HELLO = gql`
  query hello {
    hello
  }
`;
