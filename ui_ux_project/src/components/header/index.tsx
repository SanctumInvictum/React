import { Box, Button, Flex, Text, Icon } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box as="header" bg="black" color="white" py={4}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={4}>
      <Link to="/">
        <Flex align="center">
          <Icon as={FaBook} w={6} h={6} color="white" />
          <Text ml={2} fontSize="xl" fontWeight="bold">
            Reader
          </Text>
        </Flex>
      </Link>
        <Flex align="center">
          <Button
            colorScheme="whiteAlpha"
            color="black"
            bg="white"
            h="30px"           
            borderRadius="20px" 
            _hover={{ bg: 'gray.200' }}
            onClick={() => navigate('/auth')}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
