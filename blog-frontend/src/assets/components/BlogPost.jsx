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

  // Safely render HTML content with DOMPurify
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
          '.ql-size-huge': { fontSize: '2.5em' },
          '.ql-size-large': { fontSize: '1.5em' },
          '.ql-size-small': { fontSize: '0.75em' },

          // Handle headers (h1, h2, etc.)
          h1: { fontSize: '2.5em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '1em' },
          h2: { fontSize: '2em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '0.75em' },
          h3: { fontSize: '1.75em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '0.75em' },
          h4: { fontSize: '1.5em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '0.5em' },
          h5: { fontSize: '1.25em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '0.5em' },
          h6: { fontSize: '1em', fontWeight: 'bold', color: 'cyan.300', marginBottom: '0.5em' },

          // General paragraph and text styling
          p: { marginBottom: '1.5em', lineHeight: '1.75', fontSize: '1.1em' },
          strong: { fontWeight: 'bold' },
          em: { fontStyle: 'italic' },
          u: { textDecoration: 'underline' },
          s: { textDecoration: 'line-through' },

          // List styles
          ul: { paddingLeft: '2em', marginBottom: '1.5em' },
          ol: { paddingLeft: '2em', marginBottom: '1.5em' },
          'ul li': { listStyleType: 'disc' },
          'ol li': { listStyleType: 'decimal' },

          // Indented list items
          '.ql-indent-1': { marginLeft: '1em' },
          '.ql-indent-2': { marginLeft: '2em' },
          '.ql-indent-3': { marginLeft: '3em' },
          '.ql-indent-4': { marginLeft: '4em' },
          '.ql-indent-5': { marginLeft: '5em' },
          '.ql-indent-6': { marginLeft: '6em' },
          '.ql-indent-7': { marginLeft: '7em' },
          '.ql-indent-8': { marginLeft: '8em' },

          // Blockquote and code block styles
          blockquote: {
            paddingLeft: '1.5em',
            borderLeft: '4px solid cyan',
            fontStyle: 'italic',
            color: 'gray.400',
            marginBottom: '1.5em',
          },
          pre: {
            backgroundColor: 'gray.700',
            padding: '1em',
            borderRadius: '0.5em',
            overflowX: 'auto',
            marginBottom: '1.5em',
          },
          code: {
            backgroundColor: 'gray.700',
            padding: '0.2em 0.4em',
            borderRadius: '0.2em',
            fontSize: '0.95em',
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
