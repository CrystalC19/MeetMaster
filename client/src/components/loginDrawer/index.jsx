import React, { useState } from 'react';
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input, useDisclosure, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { token } = data.login;
      AuthService.login(token);

      toast({
        title: 'Login successful.',
        description: 'You have been logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast({
        title: 'Login failed.',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing fields.',
        description: 'Please provide both email and password.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await loginUser({ variables: { email, password } });
    } catch (error) {
      // Error handling is done in onError callback
    }
  };

  return (
    <>
      <Button ref={btnRef} className='buttonColorDark' onClick={onOpen}>
        Login
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
          <DrawerHeader>Login</DrawerHeader>
          <DrawerBody>
            <Input 
              placeholder="Email" 
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
            <Button colorScheme="blue" onClick={handleLogin} isLoading={loginLoading}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
