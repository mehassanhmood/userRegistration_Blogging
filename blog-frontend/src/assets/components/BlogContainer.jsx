// src/components/BlogContainer.jsx

import React, { useEffect, useState } from 'react';
import { Select, Box, VStack, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const BlogContainer = () => {
    const [category, setCategory] = useState('tech'); // Default category
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchBlogs = async (category) => {
        setLoading(true);
        setError(''); // Clear any previous error messages
        try {
            const response = await axios.get(`http://localhost:8000/posts?category=${category}`);
            setBlogs(response.data);
        } catch (err) {
            setError('Error fetching blogs'); // Set error message for fetch issues
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(category);
    }, [category]);

    return (
        <Box p={5}>
            <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                mb={4}
            >
                <option value="tech">Tech</option>
                <option value="stock market">Stock Market</option>
            </Select>

            {loading && <Spinner />}
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            {/* Check if blogs are empty and display message */}
            {blogs.length === 0 && !loading && !error && ( // Ensure no error and no loading
                <Text>No blogs available for this category.</Text>
            )}

            <VStack spacing={4} align="start">
                {blogs.map((blog) => (
                    <Box key={blog.id} p={5} shadow="md" borderWidth="1px">
                        <Text fontWeight="bold">{blog.title}</Text>
                        <Text color="gray.600">By: {blog.author}</Text>
                        <Text mt={2}>{blog.content}</Text>
                        <Text fontSize="sm" color="gray.400">{blog.date}</Text>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default BlogContainer;



