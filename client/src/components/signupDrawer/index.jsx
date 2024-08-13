import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input, useDisclosure
} from '@chakra-ui/react';

const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast(); // For showing feedback messages
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async () => {
    try {
      const response = await createUser({ variables: { email, password } });
  //     console.log('Registration successful', response);
  //     onClose();
  //   } catch (e) {
  //     console.error('error', e);
  //   }
  // };
  const { token } = response.data.createUser;

      if (token) {
        // Save the token to local storage
        localStorage.setItem('token', token);

        // Show success message
        toast({
          title: 'Registration successful.',
          description: 'You have been registered and logged in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        onClose();
      }
    } catch (e) {
      console.error('Registration error', e);

      // Show error message
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
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
