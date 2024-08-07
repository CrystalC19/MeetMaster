// src/App.jsx
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Outlet, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';


// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation().pathname;

  return (
    <ChakraProvider >
      <ApolloProvider client={client}>

        <Header>
          <Navbar location={location} />
        </Header>

        <main>
          <Outlet />
        </main>
        
        <Footer />
      
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
