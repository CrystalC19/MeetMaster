const express = require('express');

const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const stripe = require("stripe")('sk_test_51PkaosBQXcWOHffQsKH01ZVJ0zGBA5yeFDwxiJfDRx8Yt5keO102fhKWitPVx9Ov9Ha0TlP4rj7QRmTJLAFgM9qU00yx4cZ7WR');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use Apollo middleware before static files middleware
  app.use('/graphql', expressMiddleware(server));

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

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 3001!"));
