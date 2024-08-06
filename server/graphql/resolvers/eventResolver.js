// server/graphql/resolvers/eventResolver.js

const Event = require('../../models/Event');

const eventResolver = {
  Query: {
    async getEvents() {
      return await Event.find();
    },
  },
  Mutation: {
    async createEvent(_, { title, description, date, location, capacity }, context) {
      const event = new Event({ title, description, date, location, capacity });
      await event.save();
      return event;
    },
  },
};

module.exports = eventResolver;
