// server/graphql/resolvers/authResolver.js

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authResolver = {
  Mutation: {
    async register(_, { name, email, password }) {
      const user = new User({ name, email, password });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { ...user._doc, id: user._id, token };
    },
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { ...user._doc, id: user._id, token };
    },
  },
};

module.exports = authResolver;
