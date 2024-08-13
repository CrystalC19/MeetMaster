import React from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../utils/mutations'; // Adjust the import path as needed
import LoginDrawer from '../loginDrawer'; // Adjust the import path as needed
import SignupDrawer from '../signupDrawer'; // Adjust the import path as needed
import AddEvent from '../addEvent/index'; // Adjust the import path as needed
import './navbar.css'; 
import Auth from '../../utils/authContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // For client-side navigation

const Navbar = () => {
  const [logoutMutation, { loading: logoutLoading, error: logoutError }] = useMutation(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    if (Auth.isLoggedIn()) {
      try {
        await logoutMutation(); // Call the GraphQL logout mutation
        Auth.logout();
        navigate('/'); // Redirect to home or login page after logout
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
          {Auth.isLoggedIn() ? (
            <>
              <AddEvent /> {/* Only show AddEvent button if logged in */}
              <Button
                className="buttonColorLight"
                onClick={handleLogout}
                isLoading={logoutLoading}
              >
                Logout
              </Button>
            </>
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
