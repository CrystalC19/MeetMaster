import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import EventList from './eventList/index.jsx';
import Map from './map/index.jsx';
import ActiveEvent from './activeEvent/index.jsx';
import './home.css';

const Home = () => {
  return (
    <Grid
      templateRows="1fr 1fr"
      templateColumns="repeat(4, 1fr)"
      gap={4}
      height="calc(100vh - 8vh - 7vh)" /* Adjust height to fit within viewport minus header and footer */
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
        className="activeEventContainer"
      >
        <ActiveEvent />
      </GridItem>
    </Grid>
  );
};

export default Home;
