const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
  }

  type Event {
    _id: ID!
    title: String!
    description: String
    price: Float
    address: String
    image: String!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }
      type Query {
    listUsers: [User]
    getUser(userId: ID!): User
    events: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(title: String!, description: String, price: Float, address: String, image: String!): Event
  }

`;

module.exports = typeDefs;
