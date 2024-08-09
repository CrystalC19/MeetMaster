const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('events');
    },
    user: async (parent, { id }) => {
      return User.findById(id).populate('events');
    },
    events: async () => {
      return Event.find().populate('user');
    },
    event: async (parent, { id }) => {
      return Event.findById(id).populate('user');
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ email, password: hashedPassword });
          await user.save();
          
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return { token, user };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createEvent: async (parent, { title, description, price, address, image }, context) => {
      if (context.user) {
        const event = await Event.create({ title, description, price, address, image, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { events: event._id } });
        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
