import React, { useState } from 'react';
import { Box, Image, Button, Flex, Text, Input, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import goodbyeEriImg from '../images/goodby_eri.jpg';
import berserkImg from '../images/berserk.jpg';
import parasiteImg from '../images/parasite.jpg';

interface TileProps {
  src: string; // Путь к изображению
  alt: string; // Описание изображения
  hoverBorderColor: string; // Цвет рамки при наведении
  onClick: () => void; // Обработчик клика
}

const Tile: React.FC<TileProps> = ({ src, alt, hoverBorderColor, onClick }) => (
  <Box
    as="button"
    position="relative"
    width="300px"
    height="500px"
    bg="gray.700"
    borderRadius="10px"
    overflow="hidden"
    _hover={{ border: `2px solid ${hoverBorderColor}`, cursor: 'pointer' }}
    onClick={onClick}
  >
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      width="100%"
      height="100%"
    />
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({ title: 'Ошибка', description: 'Выберите файл перед загрузкой.', status: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true);
    try {
      // Шаг 1: Загрузить архив
    const uploadResponse = await axios.post('http://127.0.0.1:8000/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { archiveId } = uploadResponse.data;


    // Шаг 3: Перейти на ReaderPage с изображениями
    navigate(`/reader?archiveId=${archiveId}`);
  } catch (error) {
    console.error(error);
      toast({ title: 'Ошибка загрузки', description: 'Не удалось загрузить файл.', status: 'error' });
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <Box bg="black" color="white" minH="100vh" py={8}>
      <Flex direction="column" justify="space-between" minH="100vh">
        {/* Заголовок и кнопка Download */}
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
            mt={6}
            mb={12}
            onClick={() => setModalOpen(true)}
          >
            Download file
          </Button>
        </Flex>

        {/* Плитки с изображениями */}
        <Flex justify="center" align="center" mx="auto" maxW="1200px" px={4} gap={8} wrap="wrap">
          <Tile
            src={goodbyeEriImg}
            alt="Tile 1"
            hoverBorderColor="red"
            onClick={() => navigate(`/reader?archiveId=goodbye_eri`)}
          />
          <Tile
            src={berserkImg}
            alt="Tile 2"
            hoverBorderColor="blue"
            onClick={() => navigate(`/reader?archiveId=berserk_v40_ch2`)}
          />
          <Tile
            src={parasiteImg}
            alt="Tile 3"
            hoverBorderColor="green"
            onClick={() => navigate('/reader?archiveId=parasite_v6_ch49')}
          />
        </Flex>

        {/* Подвал */}
        <Box textAlign="center" py={4} bg="black" color="white">
          <Text fontSize="sm">2024 All rights reserved</Text>
        </Box>
      </Flex>

      {/* Модальное окно для загрузки файла */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Загрузить архив</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center" justify="center">
              <Input
                type="file"
                accept=".zip"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    setSelectedFile(files[0]);
                  } else {
                    setSelectedFile(null); 
                  }
                }}
                mb={4}
              />
              <Button
                colorScheme="teal"
                onClick={handleFileUpload}
                isLoading={loading}
              >
                Загрузить
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
