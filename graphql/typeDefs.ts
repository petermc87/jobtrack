import gql from "graphql-tag";

//---> THis is what shows up in the left selection pane in
// Apollo.
export const typeDefs = gql`
  type Category {
    id: ID!
    name: String
    # NOTE: The user @relation parameter is not matched here.
    userId: String
  }
  type User {
    # ID! represents a non nullable id.
    id: ID!
    name: String
    username: String
    email: String
    password: String
    categories: [Category]
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
    # Get one category
    category(id: ID!): Category
    # Get all categories
    categories: [Category]
    # Get one job
    job(id: ID!): Job
    # Get all jobs
    jobs: [Job]
  }
`;
