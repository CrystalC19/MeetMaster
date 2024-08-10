import React from 'react';
import {
  VStack, Box, Heading, Text, Stack, Divider, CardFooter,
  ButtonGroup, Button, Card, CardBody
} from '@chakra-ui/react';
import './eventlist.css';

const eventList = [
  {
    id: 1,
    title: 'Living room Sofa',
    description: 'This sofa is perfect for modern tropical spaces...',
    price: '$450',
    address: 'really dont wanna do queries',
  },
  {
    id: 2,
    title: 'Office Chair',
    description: 'A comfortable office chair for working from home...',
    price: '$150',
    address: 'what do our models look like',
  },
  // Add more events here
];

const EventList = () => {
  return (
    <VStack className="eventList" spacing={4} width="100%">
      {eventList.map(event => (
        <Card className="card" key={event.id}>
          <CardBody className="cardBody">
            <Stack mt="6" spacing="3">
              {/* Title and Address */}
              <Box>
                <Heading size="md">{event.title}</Heading>
                <Text>{event.address}</Text>
              </Box>
              {/* Description and Price */}
              <Text>{event.description}</Text>
              <Text color="blue.600" fontSize="2xl">{event.price}</Text>
            </Stack>
          </CardBody>
          <Divider />
          {/* Footer with Buttons */}
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="ghost" colorScheme="blue">View</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  );
};

export default EventList;
