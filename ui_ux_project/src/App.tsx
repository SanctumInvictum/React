import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
//import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Home from './pages/Home';
// import About from './pages/About';
import Header from './components/header';
import Layout from './components/Layout';


const App = () => {
  return (
    <ChakraProvider>
      <Layout>
        <Header />
        <Home />
      </Layout>
    </ChakraProvider>
  );
};

export default App;