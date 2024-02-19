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
export const NEW_CATEGORY = gql`
  mutation Mutation($name: String, $userId: String) {
    newCategory(name: $name, userId: $userId) {
      id
      name
      userId
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob($updateJobId: ID!, $newValue: String, $type: String) {
    updateJob(id: $updateJobId, newValue: $newValue, type: $type) {
      id
      title
      link
      jobDescription
      categoryId
      resumeLink
      status
    }
  }
`;
