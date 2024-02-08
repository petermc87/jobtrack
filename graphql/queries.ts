import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($email: String) {
    user(email: $email) {
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

// Retrieve from Apollo server GUI
