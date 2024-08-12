import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Outlet, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
const { createUploadLink } = require('apollo-upload-client');

import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  link: createUploadLink(),
});

function App() {
  const location = useLocation().pathname;

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;