import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Heading,
  Button,
  useColorMode,
  IconButton,
  Container,
  Stack,
  extendTheme,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import BlogContainer from './assets/components/BlogContainer';
import AddBlogPost from './assets/components/AddBlogPost';

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
  const { colorMode, toggleColorMode } = useColorMode();

  const handleAddPost = (newPost) => {
    console.log('New post:', newPost);
    window.location.reload();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh">
        {/* Header */}
        <Box bg="gray.800" py={4} px={8} color="green.300">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">BuraqBlogs</Heading>
            <Flex alignItems="center">
              <Button
                variant="ghost"
                color="cyan.300"
                _hover={{ bg: 'gray.700' }}
                mr={4}
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                color="cyan.300"
                _hover={{ bg: 'gray.700' }}
                onClick={toggleColorMode}
                variant="ghost"
              />
            </Flex>
          </Flex>
        </Box>

        {/* Main content */}
        <Container maxW="container.xl" py={8}>
          <Stack direction={['column', 'column', 'row']} spacing={8}>
            {/* Blog posts */}
            <VStack spacing={8} align="stretch" flex={2}>
              <BlogContainer />
            </VStack>

            {/* Sidebar */}
            <Box flex={1}>
              <VStack spacing={8} position="sticky" top="20px">
                {isLoggedIn && (
                  <Box
                    width="100%"
                    p={6}
                    borderRadius="lg"
                    bg="gray.700"
                    color="green.300"
                    border="1px solid"
                    borderColor="gray.600"
                  >
                    <Heading size="md" mb={4}>
                      Add New Post
                    </Heading>
                    <AddBlogPost onAddPost={handleAddPost} />
                  </Box>
                )}
                <Box
                  width="100%"
                  p={6}
                  borderRadius="lg"
                  bg="gray.700"
                  color="green.300"
                  border="1px solid"
                  borderColor="gray.600"
                >
                  <Heading size="md" mb={4}>
                    About
                  </Heading>
                  <Box>
                    Welcome to BuraqBlogs, where ideas come to life. Share your
                    thoughts, read inspiring stories, and connect with fellow
                    bloggers.
                  </Box>
                </Box>
              </VStack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
