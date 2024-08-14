// src/components/navbar/Navbar.jsx
import React from 'react';
import { Flex, Box, Button, HStack, Avatar } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../utils/mutations';
import LoginDrawer from '../loginDrawer';
import SignupDrawer from '../signupDrawer';
import AddEvent from '../addEvent/index';
import ProfilePopover from './ProfilePopover'; // Updated import path
import './navbar.css';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [logoutMutation, { loading: logoutLoading, error: logoutError }] = useMutation(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    if (Auth.loggedIn()) {
      try {
        await logoutMutation();
        Auth.logout();
        navigate('/login');
      } catch (err) {
        console.error('Logout error:', err);
        if (err.graphQLErrors) {
          err.graphQLErrors.forEach(({ message }) => {
            console.error(`GraphQL error: ${message}`);
          });
        }
        if (err.networkError) {
          console.error(`Network error: ${err.networkError.message}`);
        }
      }
    }
  };

  return (
    <Box color="white">
      <Flex justify="center">
        <Box mx={4}>
          {Auth.loggedIn() ? (
            <HStack spacing={4}>
              <ProfilePopover /> {/* Add ProfilePopover here */}
              <AddEvent />
              <Button
                className="buttonColorLight"
                onClick={handleLogout}
                isLoading={logoutLoading}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <>
              <LoginDrawer />
              <SignupDrawer />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
