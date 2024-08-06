// server/index.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { typeDefs, resolvers } = require('./graphql');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB();

app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
