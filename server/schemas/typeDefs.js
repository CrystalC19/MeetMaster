const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    events: [Event]
    event(id: ID!): Event
  }

  type Auth {
    token: String
    user: User
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    amount: Float!
    date: String!
    address: String!
  }

input CreateEventInput {
  title: String!
  description: String!
  datetime: String!
  amount: Float!
  address: String!
}


  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(
      title: String!
      description: String!
      amount: Float!
      date: String!
      address: String!
    ): Event
  }
`;

module.exports = typeDefs;
