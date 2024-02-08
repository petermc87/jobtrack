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
    user(email: String): User
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

  type Mutation {
    # Users
    newUser(
      name: String
      username: String
      email: String
      password: String
    ): User
    updateUser(id: ID!, newValue: String, type: String): User
    deleteUser(id: ID!): User
    # Categories
    newCategory(name: String, userId: String): Category
    # NOTE: The user can only change the name of the category. There is no
    # option to change the userId.
    updateCategory(id: ID!, newName: String): Category
    deleteCategory(id: ID!): Category
    # Job
    newJob(
      title: String
      link: String
      jobDescription: String
      categoryId: String
      resumeLink: String
    ): Job
    updateJob(id: ID!, newValue: String, type: String): Job
    deleteJob(id: ID!): Job
  }
`;
