import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, Button, Stack, Input, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations'; // Ensure the correct import path
import Auth from '../../utils/auth'; // Auth utility to check if logged in
import { useNavigate } from 'react-router-dom'; // For navigation
import './navbar.css'; // Ensure this path is correct

const ProfilePopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Define the mutation hook
  const [updateUser] = useMutation(UPDATE_USER);

  // Get navigation function
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (!Auth.loggedIn()) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    let formIsValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    }
    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const { data } = await updateUser({
          variables: { email, password },
        });
        console.log('Profile updated:', data);
        onClose();
      } catch (error) {
        console.error('Mutation error:', error);
      }
    }
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button className="buttonColorLight" onClick={onOpen}>
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Update Profile</PopoverHeader>
        <PopoverBody>
          <Stack spacing={3}>
            <Input
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              errorBorderColor="crimson"
              color="black" // Set text color to black
              _placeholder={{ color: 'gray.500' }} // Optional: Set placeholder text color
            />
            {errors.email && <p style={{ color: 'crimson' }}>{errors.email}</p>}
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              errorBorderColor="crimson"
              color="black" // Set text color to black
              _placeholder={{ color: 'gray.500' }} // Optional: Set placeholder text color
            />
            {errors.password && <p style={{ color: 'crimson' }}>{errors.password}</p>}
            <Button className="buttonColorLight" colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
