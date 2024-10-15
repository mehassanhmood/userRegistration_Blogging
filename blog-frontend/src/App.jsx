import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Button,
  Container,
  extendTheme,
} from '@chakra-ui/react';
import ReadPage from './assets/pages/ReadPage';
import WritePage from './assets/pages/WritePage';

// Custom theme for terminal-like appearance
const theme = extendTheme({
  fonts: {
    heading: 'Courier New, monospace',
    body: 'Courier New, monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: 'green.300',
      },
      h1: {
        color: 'cyan.300',
      },
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minHeight="100vh">
          <Box bg="gray.800" py={4} px={8} color="green.300">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="lg">BuraqBlogs</Heading>
              <Flex>
                <Button as={Link} to="/" variant="ghost" color="cyan.300" mr={4}>
                  Read
                </Button>
                <Button as={Link} to="/write" variant="ghost" color="cyan.300" mr={4}>
                  Write
                </Button>
                {isLoggedIn && (
                  <Button
                    variant="ghost"
                    color="cyan.300"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>

          <Container maxW="container.xl" py={8}>
            <Routes>
              <Route path="/" element={<ReadPage />} />
              <Route path="/write" element={<WritePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;