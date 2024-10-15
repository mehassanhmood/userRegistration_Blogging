import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Button, Badge, HStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DOMPurify from 'dompurify';

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

        if (response.data.author === userId || response.data.author === '') {
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

  // Safely render HTML content
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <Box color="green.300" bg="gray.800" p={6} borderRadius="lg">
      <Heading as="h2" size="xl" mb={4}>{blog.title}</Heading>
      <Text fontSize="sm" mb={2}>By {blog.author} | {blog.date}</Text>
      <Badge colorScheme="teal" mb={4}>{blog.category}</Badge>
      {blog.subtitle && <Text fontSize="lg" fontStyle="italic" mb={4}>{blog.subtitle}</Text>}
      <Box 
        className="blog-content" 
        dangerouslySetInnerHTML={createMarkup(blog.body)} // Render the body with formatting
        sx={{
          'h1, h2, h3, h4, h5, h6': {
            color: 'cyan.300',
            marginTop: '1em',
            marginBottom: '0.5em',
          },
          p: {
            marginBottom: '1em',
            lineHeight: '1.5', // Add line height for readability
          },
          ul: {
            paddingLeft: '2em',
            marginBottom: '1em',
          },
          ol: {
            paddingLeft: '2em',
            marginBottom: '1em',
          },
          'ul li': {
            listStyle: 'disc',
          },
          'ol li': {
            listStyle: 'decimal',
          },
        }}
      />
      <HStack spacing={4} mt={6}>
        <Button onClick={onClose} colorScheme="cyan">Back to list</Button>
        {isOwner && (
          <Button onClick={handleDelete} colorScheme="red">Delete Blog</Button>
        )}
      </HStack>
    </Box>
  );
};

export default BlogPost;
