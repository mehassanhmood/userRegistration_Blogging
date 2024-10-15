import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast, Text, Link, Select } from '@chakra-ui/react';

const AddBlogPost = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'username': username,
          'password': password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);  // Save token to local storage
        setIsLoggedIn(true);
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid username or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/register_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (response.ok) {
        toast({
          title: 'Registration successful',
          description: 'You can now log in with your credentials',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsLoginView(true);
      } else {
        const errorData = await response.json();
        toast({
          title: 'Registration failed',
          description: errorData.detail,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to add a blog post',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      subtitle,
      date: new Date().toLocaleDateString(),
      category,
      body: content,
      author: username,
    };

    try {
      const response = await fetch('http://localhost:8000/blog/blogs?db=blogs.db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post added successfully:', data);
        toast({
          title: 'Blog post added',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTitle('');
        setSubtitle('');
        setContent('');
        setCategory('');
      } else {
        console.error('Failed to add post:', response.statusText);
        toast({
          title: 'Failed to add blog post',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderAuthForm = () => {
    if (isLoginView) {
      return (
        <Box as="form" onSubmit={handleLogin} bg="gray.800" p={4} borderRadius="lg" color="green.300">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="cyan.300">Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                bg="gray.700"
                color="green.300"
                _placeholder={{ color: 'gray.400' }}
                border="1px solid"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="cyan.300">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                bg="gray.700"
                color="green.300"
                _placeholder={{ color: 'gray.400' }}
                border="1px solid"
                borderColor="gray.600"
              />
            </FormControl>
            <Button type="submit" bg="cyan.300" color="gray.800" width="100%" _hover={{ bg: 'cyan.400' }}>
              Login
            </Button>
            <Text color="green.300">
              Don't have an account?{' '}
              <Link color="cyan.300" onClick={() => setIsLoginView(false)}>
                Register here
              </Link>
            </Text>
          </VStack>
        </Box>
      );
    } else {
      return (
        <Box as="form" onSubmit={handleRegister} bg="gray.800" p={4} borderRadius="lg" color="green.300">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="cyan.300">Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                bg="gray.700"
                color="green.300"
                _placeholder={{ color: 'gray.400' }}
                border="1px solid"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="cyan.300">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                bg="gray.700"
                color="green.300"
                _placeholder={{ color: 'gray.400' }}
                border="1px solid"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="cyan.300">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                bg="gray.700"
                color="green.300"
                _placeholder={{ color: 'gray.400' }}
                border="1px solid"
                borderColor="gray.600"
              />
            </FormControl>
            <Button type="submit" bg="cyan.300" color="gray.800" width="100%" _hover={{ bg: 'cyan.400' }}>
              Register
            </Button>
            <Text color="green.300">
              Already have an account?{' '}
              <Link color="cyan.300" onClick={() => setIsLoginView(true)}>
                Login here
              </Link>
            </Text>
          </VStack>
        </Box>
      );
    }
  };

  if (!isLoggedIn) {
    return renderAuthForm();
  }

  return (
    <Box as="form" onSubmit={handleSubmit} bg="gray.800" p={4} borderRadius="lg" color="green.300">
      <VStack spacing={4}>
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
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
            bg="gray.700"
            color="green.300"
            _placeholder={{ color: 'gray.400' }}
            border="1px solid"
            borderColor="gray.600"
          >
            <option value="Tech">Tech</option>
            <option value="Stock Market">Stock Market</option>
            <option value="General">General</option>
          </Select>
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