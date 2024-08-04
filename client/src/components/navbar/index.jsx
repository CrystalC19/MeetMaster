// src/components/navbar/index.jsx
import React from 'react';
import { Flex, Link, Box } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box py={4} color="white">
      <Flex justify="center">
        <Link href="#" mx={4} color="white">
          Login
        </Link>
        <Link href="#" mx={4} color="white">
          Sign Up
        </Link>
        <Link href="#" mx={4} color="white">
          Log Out
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
