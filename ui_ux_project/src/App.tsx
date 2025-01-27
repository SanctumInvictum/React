import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ReaderPage from './pages/Reader_page';
import AuthPage from './pages/Users_page';
import Header from './components/header';
import Layout from './components/layout';


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reader" element={<ReaderPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
};

export default App;