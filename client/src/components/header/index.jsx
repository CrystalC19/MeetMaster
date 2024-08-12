import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';
import './header.css';

const Header = ({ children }) => {
  return (
    <Box as="header" className="header">
      <Flex className="container">
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
