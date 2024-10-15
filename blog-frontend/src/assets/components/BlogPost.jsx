import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Button, Badge, HStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const BlogPost = ({ blogId, onClose, onDelete }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        let userId = null;
  
        if (token) {
          userId = JSON.parse(atob(token.split('.')[1])).sub; // Decode JWT token to get the user ID
        }
  
        const response = await axios.get(`http://localhost:8000/blog/blogs/${blogId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Add token if available
        });
        setBlog(response.data);
  
        if (userId && response.data.author === userId) {
          setIsOwner(true); // Check if the logged-in user is the owner of the blog
        }
      } catch (err) {
        setError('Error fetching blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlog();
  }, [blogId]);
  

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/blog/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Blog deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDelete(blogId);
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error deleting blog',
        description: err.response?.data?.detail || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      <HStack spacing={4}>
        <Button onClick={onClose} colorScheme="cyan">Back to list</Button>
        {isOwner && (
          <Button onClick={handleDelete} colorScheme="red">Delete Blog</Button>
        )}
      </HStack>
    </Box>
  );
};

export default BlogPost;
