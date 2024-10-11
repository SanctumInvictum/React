import { Box, Button, Flex, Text, Icon } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';

const Header = () => {
  return (
    <Box as="header" bg="black" color="white" py={4}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={4}>
        <Flex align="center">
          <Icon as={FaBook} w={6} h={6} color="white" />
          <Text ml={2} fontSize="xl" fontWeight="bold">
            Reader
          </Text>
        </Flex>

        <Flex align="center">
          {/* Черная кнопка без фона и границ, только текст */}
          <Button
            variant="ghost"    // Применяем "ghost" для убирания фона
            color="white"       // Белый текст
            mr={4}
            h="30px"
            borderRadius="20px"  // Закругленные углы
            _hover={{ bg: 'black.700' }} // Фон при наведении
            _focus={{ boxShadow: 'none' }} // Убираем рамку при фокусе
          >
            Settings
          </Button>

          {/* Кнопка Sign Up с увеличенной высотой и закругленными углами */}
          <Button
            colorScheme="whiteAlpha"
            color="black"
            bg="white"
            h="30px"            // Высота кнопки
            borderRadius="20px"  // Закругленные углы
            _hover={{ bg: 'gray.200' }} // Цвет при наведении
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
