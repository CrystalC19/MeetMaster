const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    // returns list of all users
    listUsers: async () => {
      return User.find(); //.populate('events');
    },
    //returns user by ID
    getUser: async (parent, { id }) => {
      return User.findById(id); //.populate('events');
    },
    //returns list of all events
    events: async () => {
      return Event.find().populate('user');
    },
    // returns event by ID 
    event: async (parent, { id }) => {
      return Event.findById(id).populate('user');
    },
  },
  Mutation: {
    createUser: async (_, {name, email, password }) => {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({name, email, password: hashedPassword });
          await user.save();
          
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return { token, user };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    login: async (parent, { email, password }) => {
      //console.log debug
      console.log('Attempting to login with email:',email);
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.comparePassword(password);
      //debug
      console.log('Password comparison result:', correctPw);


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
