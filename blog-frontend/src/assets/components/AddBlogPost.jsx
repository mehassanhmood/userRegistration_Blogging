import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const AddBlogPost = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newPost = {
          id: Date.now(), // Unique ID for the blog post
          author,
          title,
          content,
          date: new Date().toLocaleDateString(), // Automatically append the current date
        };

        onAddPost(newPost); // Call the function passed from the parent to add the new post
        setAuthor('');
        setTitle('');
        setContent('');
      };

  return  (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit}>
            <FormControl mb={4} isRequired>
            <FormLabel>Author Name</FormLabel>
            <Input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
            />
            </FormControl>
            <FormControl mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
            />
            </FormControl>
            <FormControl mb={4} isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here"
            />
            </FormControl>
            <Button type="submit" colorScheme="teal">Add Blog Post</Button>
        </form>
    </Box>
    );
}

export default AddBlogPost

