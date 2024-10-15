import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import AddBlogPost from '../components/AddBlogPost';

const WritePage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Box>
      <Heading mb={4}>
        {isLoggedIn ? 'Write a New Blog' : 'Please Login to Write'}
      </Heading>
      <VStack spacing={8} align="stretch">
        <AddBlogPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </VStack>
    </Box>
  );
};

export default WritePage;