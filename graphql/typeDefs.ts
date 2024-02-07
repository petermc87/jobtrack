import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    # ID! represents a non nullable id.
    id: ID!
    name: String
    username: String
    email: String
    password: String
    categories: [Category]
  }

  type Category {
    id: ID!
    name: String
    # NOTE: The user @relation parameter is not matched here.
    userId: String
  }

  type Job {
    id: ID!
    title: String
    link: String
    jobDescription: String
    categoryId: String
    resumeLink: String
  }

  #   GET requests.
  type Query {
    # Get one user
    user(id: ID!): User
    # Get all users
    users: [User]
  }
`;
