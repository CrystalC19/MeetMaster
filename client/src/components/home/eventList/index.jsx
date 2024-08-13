import React from 'react';
import {
  VStack, Box, Heading, Text, Stack, Divider, CardFooter,
  ButtonGroup, Button, Card, CardBody
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../../utils/queries';
import './eventlist.css';

const EventList = ({ onSelectEvent }) => {
  // Fetch events using useQuery hook
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  // Extract events from the data and reverse the order
  const eventList = (data?.events || []).slice().reverse();

  return (
    <VStack className="eventList" spacing={4} width="100%">
      {eventList.map(event => (
        <Card
          className="card"
          key={event._id}  // Use _id from your event model
          onClick={() => {
            console.log('Event clicked:', event); // Log the event to the console
            onSelectEvent(event);
          }}
          cursor="pointer"
        >
          <CardBody className="cardBody">
            <Stack mt="6" spacing="3">
              {/* Title and Address */}
              <Box>
                <Heading size="md">{event.title}</Heading>
              </Box>
              {/* Description and Price */}
              <Text>{event.description}</Text>
              <Text>{event.address}</Text> {/* Display the event's address */}
              <Text color="blue.600" fontSize="2xl">${event.amount}</Text> {/* Display the event's amount */}
            </Stack>
          </CardBody>
          <Divider />
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
