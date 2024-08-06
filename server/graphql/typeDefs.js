// server/graphql/typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    capacity: Int!
    attendees: [User!]!
  }

  type Query {
    getEvents: [Event!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    createEvent(
      title: String!
      description: String!
      date: String!
      location: String!
      capacity: Int!
    ): Event!
  }
`;

module.exports = typeDefs;
