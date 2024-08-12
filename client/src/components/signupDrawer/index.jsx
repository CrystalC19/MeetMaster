import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, Button, Input, useDisclosure
} from '@chakra-ui/react';
import './signupDrawer.css';


const SignupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async () => {
    try {
      const response = await createUser({ variables: { email, password } });
      console.log('Registration successful', response);
      onClose();
    } catch (error) {
      console.error('Mutation error:', JSON.stringify(error, null, 2));
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
