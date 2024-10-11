import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Button, Badge } from '@chakra-ui/react';
import axios from 'axios';

const BlogPost = ({ blogId, onClose }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/blog/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        setError('Error fetching blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <Spinner color="cyan.300" />;
  if (error) return (
    <Alert status="error" bg="gray.700" borderRadius="lg" color="red.300">
      <AlertIcon color="red.300" />
      {error}
    </Alert>
  );

  if (!blog) return null;

  return (
    <Box color="green.300" bg="gray.800" p={6} borderRadius="lg">
      <Heading as="h2" size="xl" mb={4}>{blog.title}</Heading>
      <Text fontSize="sm" mb={2}>By {blog.author} | {blog.date}</Text>
      <Badge colorScheme="teal" mb={4}>{blog.category}</Badge>
      {blog.subtitle && <Text fontSize="lg" fontStyle="italic" mb={4}>{blog.subtitle}</Text>}
      <Text mb={6} whiteSpace="pre-wrap">{blog.body}</Text>
      <Button onClick={onClose} colorScheme="cyan">Back to list</Button>
    </Box>
  );
};

export default BlogPost;