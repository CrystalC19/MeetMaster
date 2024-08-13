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

//     users: async () => {
//       return User.find();
//     },
//     user: async (parent, { id }) => {
//       return User.findById(id);

    },
    //returns list of all events
    events: async () => {
      return Event.find();
    },
    // returns event by ID 
    event: async (parent, { id }) => {
      return Event.findById(id);
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

//     createUser: async (_, { email, password }) => {
//       try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         return { token, user };
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },

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

//       const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    createEvent: async (_, { title, description, amount, date, address }) => {
      const newEvent = new Event({
        title,
        description,
        amount,
        date,
        address,
      });

      return await newEvent.save();
    },
  },
};

module.exports = resolvers;
