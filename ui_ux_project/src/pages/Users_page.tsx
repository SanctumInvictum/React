import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Для отслеживания авторизации
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля.',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      if (isLogin) {
        // Вход в систему
        const response = await axios.post('http://127.0.0.1:8000/auth/login', {
          email,
          password,
        });
        // Сохраняем токен в cookies
        document.cookie = `booking_access_token=${response.data.access_token}; path=/; httponly`;
        toast({
          title: 'Успешно!',
          description: 'Вы успешно вошли в систему.',
          status: 'success',
          duration: 3000,
        });
      setIsAuthenticated(true); // Обновляем состояние при успешной аутентификации
    } else {
      // Регистрация пользователя
      await axios.post('http://127.0.0.1:8000/auth/register', {
        email,
        password,
      });
      toast({
        title: 'Успешно!',
        description: 'Регистрация прошла успешно. Пожалуйста, войдите.',
        status: 'success',
        duration: 3000,
      });
      setIsLogin(true); // Переключаем на форму входа
    }
  } catch (error) {
      const err = error as { response?: { data?: { detail?: string } } };
      toast({
        title: 'Ошибка',
        description: err.response?.data?.detail || 'Что-то пошло не так.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Если пользователь авторизован, отображаем сообщение
  if (isAuthenticated) {
    return (
      <Box
        bg="black"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          bg="black"
          width="500px"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
        >
          <Text color="green.400" fontSize="lg" fontWeight="bold">
            Вы успешно вошли в свой аккаунт
          </Text>
        </Box>
      </Box>
    );
  }

  // Форма аутентификации
  return (
    <Box bg="gray.1000" minH="100vh" display="flex" justifyContent="center" alignItems="center">
          <Box
            bg="black"
            width="500px"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            color="white"
          >
            {/* Переключатели Вход/Регистрация */}
            <Flex justifyContent="space-between" mb={6}>
              <Button
                flex="1"
                bg={isLogin ? 'gray.800' : 'gray.1000'}
                color="white"
                borderRadius="lg"
                onClick={() => setIsLogin(true)}
                _hover={{ bg: 'gray.500' }}
                mr={2}
              >
                Вход
              </Button>
              <Button
                flex="1"
                bg={!isLogin ? 'gray.600' : 'gray.800'}
                color="white"
                borderRadius="lg"
                onClick={() => setIsLogin(false)}
                _hover={{ bg: 'gray.500' }}
                ml={2}
              >
                Регистрация
              </Button>
            </Flex>
    
            {/* Поля Вход/Регистрация */}
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap={4}>
                <InputGroup>
                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="1px solid gray"
                    focusBorderColor="red.800"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'gray.600' }}
                    color="white"
                    bg="transparent"
                  />
                </InputGroup>
    
                <InputGroup>
                  <Input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    border="1px solid gray"
                    focusBorderColor="red.800"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'gray.600' }}
                    color="white"
                    bg="transparent"
                  />
                </InputGroup>
    
                {/* Кнопка */}
                <Button
                  bg="red.800"
                  color="white"
                  borderRadius="lg"
                  mt={4}
                  size="lg"
                  _hover={{ bg: 'red.600' }}
                  type="submit"
                >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
  );
};

export default AuthPage;

