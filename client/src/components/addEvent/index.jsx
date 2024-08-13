import React, { useState } from 'react';
import { 
  InputGroup, 
  InputLeftAddon, 
  VStack, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  Textarea, 
  FormControl, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  useDisclosure, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper 
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS } from '../../utils/queries'; // Import the query to fetch events
import './addEvent.css';

const AddEvent = ({ onEventCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createEvent] = useMutation(CREATE_EVENT);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    amount: '',
  });

  const handleSubmit = async () => {
    let formIsValid = true;
    const newErrors = {
      title: '',
      description: '',
      date: '',
      address: '',
      amount: '',
    };
  
    if (!title) {
      formIsValid = false;
      newErrors.title = 'Event title is required';
    }
    if (!description) {
      formIsValid = false;
      newErrors.description = 'Event description is required';
    }
    if (!date) {
      formIsValid = false;
      newErrors.date = 'Event date is required';
    }
    if (!address) {
      formIsValid = false;
      newErrors.address = 'Address is required';
    }
    if (amount === '') {
      formIsValid = false;
      newErrors.amount = 'Amount is required';
    }
  
    setErrors(newErrors);
  
    if (formIsValid) {
      try {
        const { data } = await createEvent({
          variables: { 
            title, 
            description, 
            amount: parseFloat(amount), 
            date, 
            address 
          },
          update: (cache, { data: { createEvent } }) => {
            const { events } = cache.readQuery({ query: QUERY_EVENTS });
            cache.writeQuery({
              query: QUERY_EVENTS,
              data: { events: [...events, createEvent] },
            });
          },
        });
        console.log('Event added:', data.createEvent);
        onClose();
        if (onEventCreated) onEventCreated(data.createEvent);
      } catch (error) {
        console.error('Mutation error:', error);
      }
    }
  };
  
  return (
    <>
      <Button onClick={onOpen} className='buttonColorDark'>
        Add Event
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start" className="form-control">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Event Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">Event Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Event Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.date}>
                <FormLabel htmlFor="date">Event Date</FormLabel>
                <Input
                  type="datetime-local"
                  id="date"
                  placeholder="Event Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <FormErrorMessage>{errors.date}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  placeholder="Event Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <NumberInput
                    max={1000}
                    min={0}
                    value={amount}
                    onChange={(value) => setAmount(value)}
                    width="100%"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage>{errors.amount}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEvent;
