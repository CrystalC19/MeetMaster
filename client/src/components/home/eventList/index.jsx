import React from 'react';
import {
  VStack, Box, Heading, Text, Image, Stack, Divider, CardFooter,
  ButtonGroup, Button, Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Card, CardBody
} from '@chakra-ui/react';
import './eventlist.css';

const eventList = [
  // Example data
  {
    id: 1,
    title: 'Living room Sofa',
    description: 'This sofa is perfect for modern tropical spaces...',
    price: '$450',
    address: 'really dont wanna do queries',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 2,
    title: 'Office Chair',
    description: 'A comfortable office chair for working from home...',
    price: '$150',
    address: 'what do our models look like',
    imageUrl: 'https://images.unsplash.com/photo-1560493672-04071c5f467b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
  },
  // Add more events here
];

const EventList = () => {
  return (
    <VStack className="eventList" spacing={4} width="100%">
      {eventList.map(event => (
        <Card className="card" key={event.id}>
          <CardBody className="cardBody">
            {/* Image Section */}
            <Image
              src={event.imageUrl}
              alt={event.title}
              borderRadius="lg"
              width="100%"
            />

            <Stack mt="6" spacing="3">
              {/* Accordion for Title and Address */}
              <Box>
                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="center">
                          <Heading size="md">{event.title}</Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {event.address}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
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
              <Button variant="solid" colorScheme="blue">Buy now</Button>
              <Button variant="ghost" colorScheme="blue">Add to cart</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  );
};

export default EventList;
