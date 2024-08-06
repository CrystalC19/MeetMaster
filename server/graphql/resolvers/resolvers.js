// server/graphql/resolvers/index.js

const authResolver = require('./authResolver');
const eventResolver = require('./eventResolver');

const resolvers = {
  Query: {
    ...eventResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation,
  },
};

module.exports = resolvers;
