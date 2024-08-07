import React from 'react';
import { VStack, Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';

const eventList = [
  // Example data
  {
    id: 1,
    title: 'Living room Sofa',
    description: 'This sofa is perfect for modern tropical spaces...',
    price: '$450',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 2,
    title: 'Office Chair',
    description: 'A comfortable office chair for working from home...',
    price: '$150',
    imageUrl: 'https://images.unsplash.com/photo-1560493672-04071c5f467b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
  },
  // Add more events here
];

const EventList = () => {
  return (
    <VStack spacing={4} width="100%">
      {eventList.slice().map(event => (
        <Card key={event.id} width="100%">
          <CardBody p={0}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              borderRadius="lg"
              width="100%"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{event.title}</Heading>
              <Text>{event.description}</Text>
              <Text color="blue.600" fontSize="2xl">{event.price}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">Buy now</Button>
              <Button variant="ghost" colorScheme="blue">Save event</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  );
};

export default EventList;
