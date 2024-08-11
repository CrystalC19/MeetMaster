import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Stack, StackDivider, Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import './activeEvent.css';

const ActiveEvent = () => {
  return (
    <Card className="activeEventCard" direction={{ base: 'column', sm: 'row' }} overflow="hidden">
      <Image
        className="activeEventImage"
        objectFit="cover"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Event"
      />
      <Stack className="activeEventContent" spacing="4">
        <CardHeader>
          <Heading size="md" textAlign="left">Event Details</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                View a summary of the event details.
              </Text>
            </Box>
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                Check out the overview of the event.
              </Text>
            </Box>
            <Box textAlign="left">
              <Text pt="2" fontSize="sm">
                See a detailed analysis of the event.
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
