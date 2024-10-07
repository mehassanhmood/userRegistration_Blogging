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
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import BlogContainer from './assets/components/BlogContainer';
import AddBlogPost from './assets/components/AddBlogPost';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleAddPost = (newPost) => {
    // In a real app, you would send this to your backend
    console.log('New post:', newPost);
    // For now, we'll just reload the page to simulate the new post being added
    window.location.reload();
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh">
        {/* Header */}
        <Box bg="purple.500" py={4} px={8} color="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">BuraqBlogs</Heading>
            <Flex alignItems="center">
              <Button variant="ghost" mr={4} onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
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
                  <Box width="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
                    <Heading size="md" mb={4}>Add New Post</Heading>
                    <AddBlogPost onAddPost={handleAddPost} />
                  </Box>
                )}
                <Box width="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
                  <Heading size="md" mb={4}>About</Heading>
                  <Box>Welcome to BuraqBlogs, where ideas come to life. Share your thoughts, read inspiring stories, and connect with fellow bloggers.</Box>
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