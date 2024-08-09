import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import EventList from './eventList/index.jsx';
import Map from './map/index.jsx';
import './home.css'; // Import the CSS file

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
        className="eventListContainer"
      >
        <EventList />
      </GridItem>
      <GridItem
        colSpan={2}
        className="mapContainer"
      >
        <Map />
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
