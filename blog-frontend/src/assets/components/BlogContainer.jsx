import React, { useEffect, useState } from 'react';
import { Select, Box, VStack, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import BlogList from './BlogList';
import BlogPost from './BlogPost';

const BlogContainer = () => {
  const [category, setCategory] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const fetchBlogs = async (category) => {
    setLoading(true);
    setError('');
    try {
      const url = category
        ? `http://localhost:8000/blog/blogs?category=${encodeURIComponent(category)}`
        : 'http://localhost:8000/blog/blogs';
      const response = await axios.get(url);
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

  const handleBlogClick = (blogId) => {
    setSelectedBlogId(blogId);
  };

  const handleBackToList = () => {
    setSelectedBlogId(null);
  };

  return (
    <Box color="green.300" bg="gray.800" p={4} borderRadius="lg">
      {!selectedBlogId && (
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
          <option value="Tech">Tech</option>
          <option value="Stock Market">Stock Market</option>
          <option value="General">General</option>
        </Select>
      )}

      {loading && <Spinner color="cyan.300" />}
      {error && (
        <Alert status="error" bg="gray.700" borderRadius="lg" color="red.300">
          <AlertIcon color="red.300" />
          {error}
        </Alert>
      )}

      {!selectedBlogId && blogs.length === 0 && !loading && !error && (
        <Text>No blogs available for this category.</Text>
      )}

      {!selectedBlogId && blogs.length > 0 && (
        <BlogList posts={blogs} onBlogClick={handleBlogClick} />
      )}

      {selectedBlogId && (
        <BlogPost blogId={selectedBlogId} onClose={handleBackToList} />
      )}
    </Box>
  );
};

export default BlogContainer;