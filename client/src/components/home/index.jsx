import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import EventList from './eventList/index.jsx';

const Home = () => {
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={0}
      height="100%"
    >
      <GridItem
        colSpan={2}
        rowSpan={2}
        bg="papayawhip"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        overflowY="auto"
        p={2}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
          'scrollbar-width': 'none',  /* Firefox */
        }}
      >
        <EventList />
      </GridItem>
      <GridItem
        colSpan={2}
        bg="papayawhip"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="black" fontSize="lg" fontWeight="bold">
          Map
        </Text>
      </GridItem>
      <GridItem
        colSpan={2}
        bg="tomato"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize="lg" fontWeight="bold">
          Selected Listing
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Home;
