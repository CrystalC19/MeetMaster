import React from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import LoginDrawer from '../loginDrawer';
import SignupDrawer from '../signupDrawer';
import AddEvent from '../addEvent/index'; // Import the AddEvent component
import './navbar.css'; 

const Navbar = () => {
  return (
    <Box color="white">
      <Flex justify="center">
        <Box mx={4}>
          <LoginDrawer />
        </Box>
        <Box mx={4}>
          <SignupDrawer />
        </Box>
        <Box mx={4}>
          <AddEvent /> {/* Add the AddEvent button */}
        </Box>
        <Box mx={4}>
          <Button className="navbar-button" onClick={() => alert('Logged out')}>
            Log Out
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
