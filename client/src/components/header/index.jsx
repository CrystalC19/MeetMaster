// src/components/header/index.jsx
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';

const Header = ({ children }) => {
  return (
    <Box as="header" bg="tomato" color="white" mb={2} height="8vh" py={3} px={2}>
      <Flex
        className="container"
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={{ base: 'center', lg: 'space-between' }}
        alignItems="center"
        height="100%" // Ensure Flex container takes the full height of the header
      >
        <Link to="/">
          <Heading as="h1" m={0}>
            Title: MeetMaster
          </Heading>
        </Link>
        {children}
      </Flex>
    </Box>
  );
};

export default Header;
