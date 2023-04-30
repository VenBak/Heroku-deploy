const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
    type Post {
    _id: ID
    postTitle: String
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts: [Post]!
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(id: ID!, username: String!, email: String!, password: String!): Auth
    deleteUser(userId: ID!): User
    createPost(postTitle: String!, postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
