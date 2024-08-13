import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, HttpLink  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';


import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// // Create an instance of ApolloClient
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   cache: new InMemoryCache(),
// });
// Construct request middleware that will attach the JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an httpLink
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Combine authLink and httpLink
const link = ApolloLink.from([authLink, httpLink]);

// Create an instance of ApolloClient
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
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
