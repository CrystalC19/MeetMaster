import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Outlet, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';

import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CheckoutForm from './components/home/Payment';
import './App.css';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);



// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation().pathname;

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <Flex direction="column" height="100vh">
          <Box height="8vh">
            <Header>
              <Navbar location={location} />
            </Header>
          </Box>
          <Box flex="1" overflow="auto">
            <Outlet />
          </Box>
          <Box height="7vh">
            <Footer />
          </Box>
        </Flex>
        </Elements>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
