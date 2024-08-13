require('dotenv').config();
const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

//const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('./models/User'); // Import User model

//const authMiddleware = require ('./utils/auth');

const { authMiddleware } = require('./utils/auth');


const cors = require('cors'); // Import the cors package


const app = express();
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return { user };
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
    return {};
  },
//   // Define the context for the Apollo Server
//   context: async ({ req }) => {
//     const token = req.headers.authorization || '';
//     if (token) {
//       try {
//         // Verify the token and get user id
//         const { id } = jwt.verify(token, 'your_secret_key');
//         // Fetch the user from the database
//         const user = await User.findById(id);
//         return { user };
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     return {};
//   },
});

// Start Apollo Server and set up middleware
const startApolloServer = async () => {
  await server.start();

  // Use CORS middleware
  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the client
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  // Use Apollo middleware before static files middleware
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  // Serve static files in both development and production
  const staticPath = path.join(__dirname, '../client/dist');
  console.log('Serving static files from:', staticPath);

  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    console.log('Sending index.html from:', indexPath);
    res.sendFile(indexPath);
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
