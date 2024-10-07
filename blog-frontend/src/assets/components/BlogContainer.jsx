import React, { useEffect, useState } from 'react';
import { Select, Box, VStack, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import BlogList from './BlogList';

const BlogContainer = () => {
  const [category, setCategory] = useState('tech');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBlogs = async (category) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/posts?category=${category}`);
      setBlogs(response.data);
    } catch (err) {
      setError('Error fetching blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(category);
  }, [category]);

  return (
    <Box color="green.300" bg="gray.800" p={4} borderRadius="lg">
      <Select
        placeholder="Select category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb={4}
        bg="gray.700"
        color="green.300"
        border="1px solid"
        borderColor="gray.600"
        _hover={{ borderColor: 'cyan.300' }}
      >
        <option value="tech">Tech</option>
        <option value="stock market">Stock Market</option>
        <option value="general">General</option>
      </Select>

      {loading && <Spinner color="cyan.300" />}
      {error && (
        <Alert status="error" bg="gray.700" borderRadius="lg" color="red.300">
          <AlertIcon color="red.300" />
          {error}
        </Alert>
      )}

      {blogs.length === 0 && !loading && !error && (
        <Text>No blogs available for this category.</Text>
      )}

      {blogs.length > 0 && <BlogList posts={blogs} />}
    </Box>
  );
};

export default BlogContainer;
