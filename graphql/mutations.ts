import { gql } from "@apollo/client";

export const NEW_USER = gql`
  mutation Mutation(
    $name: String
    $username: String
    $email: String
    $password: String
  ) {
    newUser(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      id
      name
      username
      email
      password
      categories {
        id
        name
        userId
      }
    }
  }
`;
