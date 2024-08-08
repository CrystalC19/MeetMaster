import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
//Added the Cart
import Cart from "../components/Cart";

const Home = () => {
  return (
    <Grid
      className="css-1mvw6hw"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={2}
      height={'82vh'}
      p={2}
    >
      <GridItem
        colSpan={2}
        rowSpan={2}
        bg="papayawhip"
        borderRadius="md"
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="black" fontSize="lg" fontWeight="bold">
          Listing Cards
        </Text>
      </GridItem>
      <GridItem
        colSpan={2}
        bg="papayawhip"
        borderRadius="md"
        boxShadow="md"
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
        borderRadius="md"
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize="lg" fontWeight="bold">
          Selected Listing
        </Text>
      </GridItem>
      <Cart />
    </Grid>
  );
};

export default Home;
