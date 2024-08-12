import React, { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import EventList from './eventList/index.jsx';
import Map from './map/index.jsx';
import ActiveEvent from './activeEvent/index.jsx';
import { geocodeAddress } from '../../utils/geocode'; // Ensure correct import
import './home.css';

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventLocation, setSelectedEventLocation] = useState(null);

  useEffect(() => {
    const updateMapCenter = async () => {
      if (selectedEvent && selectedEvent.address) {
        try {
          console.log('Event clicked:', selectedEvent);
          const location = await geocodeAddress(selectedEvent.address);
          console.log('Geocoded location:', location);
          setSelectedEventLocation(location);
        } catch (error) {
          console.error('Error geocoding address:', error);
        }
      }
    };

    updateMapCenter();
  }, [selectedEvent]);

  return (
    <Grid
      templateRows="1fr 1fr"
      templateColumns="repeat(4, 1fr)"
      gap={4}
      height="calc(100vh - 8vh - 7vh)"
    >
      <GridItem
        colSpan={2}
        rowSpan={2}
        className="eventListContainer"
      >
        <EventList onSelectEvent={setSelectedEvent} />
      </GridItem>
      <GridItem
        colSpan={2}
        className="mapContainer"
      >
        <Map selectedEventLocation={selectedEventLocation} />
      </GridItem>
      <GridItem
        colSpan={2}
        className="activeEventContainer"
      >
        <ActiveEvent event={selectedEvent} />
      </GridItem>
    </Grid>
  );
};

export default Home;
