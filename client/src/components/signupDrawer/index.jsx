import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/authContext'
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input, useDisclosure, useToast
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import './signupDrawer.css';


const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast(); // For showing feedback messages
  // const { login } = useAuth(); // Use the login method from Auth context
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useMutation(CREATE_USER);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Input error.',
        description: 'Email and password are required.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await createUser({
        variables: { email, password },
      });

      const { token } = data.createUser;

      if (token) {
        Auth.login(token);

        toast({
          title: 'Registration successful.',
          description: 'You have been registered and logged in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        onClose();
        navigate("/home");

        ;

      }
    } catch (e) {
      console.error('Registration error:', e);

      if (e.networkError) {
        console.error('Network error:', e.networkError);
      }

      if (e.graphQLErrors) {
        console.error('GraphQL errors:', e.graphQLErrors);
      }

      toast({
        title: 'Registration failed.',
        description: 'Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  

  return (
    <>
      <Button ref={btnRef} className='buttonColorLight' onClick={onOpen}>
        Sign Up
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sign Up</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Email"
              type="email"
              mb={3}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignupDrawer;
