import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Stack, StackDivider, Box, Heading, Text, Button } from '@chakra-ui/react';
import './activeEvent.css';

const ActiveEvent = ({ event }) => {
  if (!event) {
    return <Heading size="lg">Welcome</Heading>;
  }

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10)); // Convert timestamp to Date object
    const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options).replace(',', ' at');
  };

  // Function to format the amount as USD
  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`; // Convert amount to a number and format it as a dollar amount
  };

  return (
    <Card className="activeEventCard" direction={{ base: 'column', sm: 'row' }} overflow="hidden">
      <Stack className="activeEventContent" spacing="4">
        <CardHeader>
          <Heading size="md" textAlign="left">{event.title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                {event.description}
              </Text>
            </Box>
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                Date: {formatDate(event.date)}
              </Text>
            </Box>
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                Cover charge: {formatAmount(event.amount)}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Take Action
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ActiveEvent;
