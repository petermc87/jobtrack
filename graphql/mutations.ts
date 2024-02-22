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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryId: ID!, $newName: String) {
    updateCategory(id: $updateCategoryId, newName: $newName) {
      id
      name
      userId
      jobs {
        id
        title
        link
        jobDescription
        categoryId
        resumeLink
        status
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation Mutation($deleteCategoryId: ID!) {
    deleteCategory(id: $deleteCategoryId) {
      id
      name
      userId
      jobs {
        id
        title
        link
        jobDescription
        categoryId
        resumeLink
        status
      }
    }
  }
`;

export const NEW_JOB = gql`
  mutation Mutation(
    $title: String
    $link: String
    $jobDescription: String
    $categoryId: String
    $resumeLink: String
    $status: String
  ) {
    newJob(
      title: $title
      link: $link
      jobDescription: $jobDescription
      categoryId: $categoryId
      resumeLink: $resumeLink
      status: $status
    ) {
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
