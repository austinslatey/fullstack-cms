const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    author: User!
  }

  type Query {
    currentUser: User
    getPosts: [Post!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    createPost(title: String!, content: String!): Post!
  }
`;

module.exports = typeDefs;