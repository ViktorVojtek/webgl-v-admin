import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation loginUser($input: UserDataLoginInput) {
    loginUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;
