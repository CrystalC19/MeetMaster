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

    updateUser: async (_, { email, password }, context) => {
      // Ensure the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      // Find the user by ID (assuming you have user ID in context)
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new UserInputError('User not found');
      }
      // Update fields if provided
      if (email) {
        user.email = email;
      }
      if (password) {
        // Hash the new password before saving
        user.password = await bcrypt.hash(password, 10);
      }
      // Save the updated user
      await user.save();
      return user;
    },

    login: async (parent, { email, password },) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
        // const hashLogin = await createHash(password);
        // console.log('hash login', hashLogin);

        const correctPw = await bcrypt.compare(password, user.password); // Ensure correctPassword method is replaced with bcrypt.compare
        console.log("resolver, Password", password);
        console.log("resolver, User Password", user.password);
        console.log("resolver, Correct Password", correctPw);



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