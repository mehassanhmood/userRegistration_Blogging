import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import BlogContainer from '../components/BlogContainer';

const ReadPage = () => {
  return (
    <Box>
      <Heading mb={4}>Read Blogs</Heading>
      <BlogContainer />
    </Box>
  );
};

export default ReadPage;