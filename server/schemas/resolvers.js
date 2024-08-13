const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {

    // returns list of all users
    listUsers: async () => {
      return User.find(); //.populate('events');
    },
    //returns user by ID
    getUser: async (parent, { userId }) => {
      return User.findById(userId); //.populate('events');

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
 // Creates a new user
 createUser: async (_, { name, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    throw new Error('Failed to create user');
  }
},

      login: async (parent, { email, password },) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
  
          const correctPw = await bcrypt.compare(password, user.password); // Ensure correctPassword method is replaced with bcrypt.compare
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          
          const token = signToken(user);
          return { token, user };
        } catch (error) {
          console.error('login error:', error)
          throw new Error('Failed to log in');
        }
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
    logout: async (_, __, context) => {
      try {
        // Example: Clear token from cookies or handle token invalidation logic
        if (context.res) {
          context.res.clearCookie('token'); // Adjust if using a different mechanism
        }
        return true; // Indicate that logout was successful
      } catch (error) {
        throw new Error('Failed to logout');
      }
    },
  },
};

module.exports = resolvers;
