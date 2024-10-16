import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Text, Link, Select } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Custom CSS for the Quill editor
const quillStyles = `
  .ql-container {
    min-height: 300px;
    max-height: 600px;
    overflow-y: auto;
  }
  .ql-editor {
    min-height: 280px;
    max-height: 580px;
    overflow-y: auto;
  }
`;

const AddBlogPost = ({ isLoggedIn, setIsLoggedIn }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (storedToken && storedUsername) {
            setToken(storedToken);
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

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
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', username);
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

        if (!isLoggedIn || !username) {
            toast({
                title: 'Authentication required',
                description: 'Please log in to add a blog post',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!title || !content || !category) {
            toast({
                title: 'Incomplete form',
                description: 'Please fill in all fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            date: new Date().toLocaleDateString(),
            category,
            body: content,
            author: username,
        };

        try {
            const response = await fetch('http://localhost:8000/blog/blogs', {
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

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    if (!isLoggedIn) {
        return renderAuthForm();
    }

    return (
        <Box as="form" onSubmit={handleSubmit} bg="gray.800" p={4} borderRadius="lg" color="green.300">
            <style>{quillStyles}</style>
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
                    <Box 
                        bg="gray.700" 
                        borderRadius="md" 
                        overflow="hidden"
                        sx={{
                            '.ql-toolbar': {
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                borderBottom: '1px solid #4A5568',
                            },
                            '.ql-container': {
                                border: 'none',
                            },
                            '.ql-editor': {
                                backgroundColor: '#2D3748',
                                color: '#68D391',
                            },
                        }}
                    >
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                        />
                    </Box>
                </FormControl>
                <Button type="submit" bg="cyan.300" color="gray.800" width="100%" _hover={{ bg: 'cyan.400' }}>
                    Add Blog Post
                </Button>
            </VStack>
        </Box>
    );
};

export default AddBlogPost;