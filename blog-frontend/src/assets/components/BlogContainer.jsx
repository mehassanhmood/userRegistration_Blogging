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
        <Box>
            <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                mb={4}
            >
                <option value="tech">Tech</option>
                <option value="stock market">Stock Market</option>
                <option value="general">General</option>
            </Select>

            {loading && <Spinner />}
            {error && (
                <Alert status="error">
                    <AlertIcon />
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