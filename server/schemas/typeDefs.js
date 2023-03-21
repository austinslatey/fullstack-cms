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
    user(_id: ID!): User
    me: User
  }

  type Auth {
    token: String!
    user: User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPost(title: String!, content: String!): Post!
    updateUser(_id: ID!, username: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;