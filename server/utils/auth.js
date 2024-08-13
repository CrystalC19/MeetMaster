require('dotenv').config({path: `${__dirname}/../../.env`});
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
console.log("jwtSecret", jwtSecret)
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const expiration = '2h'; // Token expiration time

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, jwtSecret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ user }) {
    const payload = {  email: user.email, name: user.name, _id: user._id  };
    return jwt.sign({ data: payload }, jwtSecret, { expiresIn: expiration });
  },



};

