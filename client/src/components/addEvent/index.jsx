import React from 'react';
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
import './addEvent.css'; // Import the CSS file

const AddEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State variables for form inputs
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [description2, setDescription2] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [file, setFile] = React.useState(null); // State for file input

  // Validation state
  const [errors, setErrors] = React.useState({
    title: '',
    description: '',
    date: '',
    address: '',
    description2: '',
    amount: '',
    file: '', // Validation for file input
  });

  // Handle form submission
  const handleSubmit = () => {
    let formIsValid = true;
    const newErrors = {
      title: '',
      description: '',
      date: '',
      address: '',
      description2: '',
      amount: '',
      file: '', // Validation for file input
    };

    // Validation for all fields
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
    if (!description2) {
      formIsValid = false;
      newErrors.description2 = 'Event description is required';
    }
    if (amount === '') {
      formIsValid = false;
      newErrors.amount = 'Amount is required';
    }
    if (!file) {
      formIsValid = false;
      newErrors.file = 'File is required'; // Validation for file input
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log('Event added:', { title, description, date, address, description2, amount, file });
      onClose(); // Close the modal after submission
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
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
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <FormErrorMessage>{errors.date}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.file}>
                <FormLabel htmlFor="file">Upload File</FormLabel>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <FormErrorMessage>{errors.file}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <NumberInput
                    max={50}
                    min={10}
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
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEvent;
