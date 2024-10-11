import { Box, Button, Flex, Text } from '@chakra-ui/react';
import PinterestPin from '../components/PinterestPin'; // Импорт компонента с пином

const Home = () => {
  return (
    <Box bg="black" color="white" minH="100vh" py={8}>
      <Flex direction="column" justify="space-between" minH="100vh">
        <Flex direction="column" align="center" justify="center" textAlign="center" mb={12}>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            You can download the archive with images that converted to the scrolling list
          </Text>
          <Button
            bg="white"
            color="black"
            borderRadius="20px"
            size="lg"
            padding="16px 32px"
            _hover={{ bg: 'gray.200' }}
            mt={6} // Добавление верхнего отступа для кнопки
            mb={12} // Нижний отступ для пространства под кнопкой
          >
            Download file
          </Button>
        </Flex>

        {/* Размещаем пины в одной строке */}
        <Flex justify="center" align="center" mx="auto" maxW="1200px" px={4} gap={8}>
          {/* Встраивание первого пина */}
          <Flex direction="column" align="center" maxW="300px">
            <PinterestPin pinUrl="https://ru.pinterest.com/pin/866309678367894063/" />
            <Flex justify="center" mt={4}>
              <Button
                bg="white"
                color="black"
                borderRadius="20px"
                size="md"
                padding="12px 24px"
                _hover={{ bg: 'gray.200' }}
              >
                Watch your downloads
              </Button>
            </Flex>
          </Flex>
          {/* Встраивание второго пина */}
          <Flex direction="column" align="center" maxW="300px">
            <PinterestPin pinUrl="https://ru.pinterest.com/pin/346917977564560487/" />
            {/* Отцентрированная кнопка */}
            <Flex justify="center" mt={4}>
              <Button
                bg="white"
                color="black"
                borderRadius="20px"
                size="md"
                padding="12px 24px"
                _hover={{ bg: 'gray.200' }}
              >
                History of readings
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {/* Нижний колонтитул */}
        <Box textAlign="center" py={4} bg="black" color="white">
          <Text fontSize="sm">
            2024 All rights reserved
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;