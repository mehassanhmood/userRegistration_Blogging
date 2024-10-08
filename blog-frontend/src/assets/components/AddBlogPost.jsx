import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';

const AddBlogPost = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');  // Add a field for subtitle
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),  // Automatically generated ID
      title,
      subtitle,  // Subtitle field is included
      date: new Date().toLocaleDateString(),  // Date in ISO format (could be customized)
      category,
      body: content,  // 'content' mapped to 'body'
      author,
    };

    try {
      const response = await fetch('http://localhost:8000/blog/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post added successfully:', data);
        // Optionally reset the form fields
        setAuthor('');
        setTitle('');
        setSubtitle('');  // Clear subtitle field
        setContent('');
        setCategory('');
      } else {
        console.error('Failed to add post:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <FormControl>
          <FormLabel color="cyan.300">Subtitle</FormLabel>
          <Input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter blog subtitle"
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
