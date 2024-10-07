import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';

const AddBlogPost = ({ onAddPost }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      id: Date.now(),
      author,
      title,
      content,
      category,
      date: new Date().toLocaleDateString(),
    };

    onAddPost(newPost);
    setAuthor('');
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} bg="gray.800" p={4} borderRadius="lg" color="green.300">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="cyan.300">Author Name</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            bg="gray.700"
            color="green.300"
            _placeholder={{ color: 'gray.400' }}
            border="1px solid"
            borderColor="gray.600"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="cyan.300">Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            bg="gray.700"
            color="green.300"
            _placeholder={{ color: 'gray.400' }}
            border="1px solid"
            borderColor="gray.600"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="cyan.300">Category</FormLabel>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter blog category"
            bg="gray.700"
            color="green.300"
            _placeholder={{ color: 'gray.400' }}
            border="1px solid"
            borderColor="gray.600"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="cyan.300">Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            bg="gray.700"
            color="green.300"
            _placeholder={{ color: 'gray.400' }}
            border="1px solid"
            borderColor="gray.600"
          />
        </FormControl>
        <Button type="submit" bg="cyan.300" color="gray.800" width="100%" _hover={{ bg: 'cyan.400' }}>
          Add Blog Post
        </Button>
      </VStack>
    </Box>
  );
};

export default AddBlogPost;
