// src/components/footer/index.jsx
import React from 'react';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

const Footer = () => {
  const icons = [
    {
      name: FaGithub,
      link: "",
    },
    {
      name: FaLinkedin,
      link: "",
    },
    {
      name: FaStackOverflow,
      link: "",
    },
  ];

  return (
    <Box as="footer" py={4} bg="tomato" color="white" height={'7vh'}>
      <Flex justify="center" gap={4}>
        {icons.map((icon, index) => (
          <Link href={icon.link} key={index} isExternal>
            <Icon as={icon.name} boxSize={6} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default Footer;
