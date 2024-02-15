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
        jobs {
          id
          title
          status
          link
          jobDescription
          categoryId
          resumeLink
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
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

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      userId
    }
  }
`;

// Retrieve from Apollo server GUI
