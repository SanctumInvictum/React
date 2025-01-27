import { useState, useEffect } from 'react';
import { Box, Flex, Text, Image, Spinner} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ReaderPage = () => {
  const [searchParams] = useSearchParams();
  const archiveId = searchParams.get('archiveId'); // Получаем archiveId из URL
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchImages = async () => {
    if (!archiveId) {
      setError('archiveId не указан.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Reader/get-images/${archiveId}`);
      const imageUrls = response.data.images || [];
      setImages(imageUrls.map((url: string, idx: number) => ({ id: idx.toString(), url })));
    } catch (err) {
      setError('Не удалось загрузить изображения. Проверьте подключение к серверу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [archiveId]);

  return (
    <Box bg="black" color="white" minH="100vh" position="relative" p={4}>
      {/* Основной контейнер */}
      <Flex
        direction="column"
        align="center"
        overflowY="scroll"
        maxH="100vh"
        pt={20}
        px={20}
        w={["100%", "90%", "80%"]}
        mx="auto"
        bg="gray.1000"
        borderRadius="md"
        boxShadow="lg"
      >
        {/* Ошибка */}
        {error && (
          <Text color="red.400" mb={4}>
            {error}
          </Text>
        )}

        {/* Загрузка */}
        {loading && !error && (
          <Flex direction="column" align="center" justify="center" mt={20}>
            <Spinner size="xl" color="teal.300" />
            <Text mt={4}>Загрузка изображений...</Text>
          </Flex>
        )}

        {/* Изображения */}
        {!loading && images.length > 0 && (
          <>
            {images.map((img, idx) => (
              <Image
                key={img.id}
                src={img.url}
                alt={`Image ${idx + 1}`}
                objectFit="cover"
                width="80%"
                mb={0}
              />
            ))}
            <Box mt={8} textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                Просмотрено страниц: {images.length}/{images.length}
              </Text>
            </Box>
          </>
        )}
        {/* Нет изображений */}
        {!loading && images.length === 0 && !error && (
          <Text mt={20} color="gray.400">
            Изображения не найдены.
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default ReaderPage;


