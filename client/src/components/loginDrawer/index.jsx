import React, { useState } from 'react';
import { LOGIN_USER } from "../../utils/mutations";'@apollo/client';
import { useMutation } from '@apollo/client';
import  AuthService from '../../utils/auth';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input, useDisclosure, useToast
} from '@chakra-ui/react';


const LoginDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast(); // For showing feedback messages


  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      // Assuming the token is returned in data.login.token
      const { token } = data.login;

      // Save token to local storage
      //localStorage.setItem('token', token);
      AuthService.login(token);

      // Show success message
      toast({
        title: 'Login successful.',
        description: 'You have been logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Close the drawer
      onClose();

      // Optionally, redirect or update the state
      // window.location.href = '/dashboard'; // Redirect example
    },
    onError: (error) => {
      // Handle error
      toast({
        title: 'Login failed.',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleLogin = () => {
    loginUser({ variables: { username, password } });
  };


  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
            <Input placeholder="Username" mb={3}   value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="Password" type="password"  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleLogin}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
