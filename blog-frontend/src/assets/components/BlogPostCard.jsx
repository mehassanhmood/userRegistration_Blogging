import React from 'react'
import { Box, Heading, Text, Badge, Flex, useColorModeValue } from '@chakra-ui/react'

const BlogPostCard = ({ post, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
      onClick={onClick}
      cursor="pointer"
      _hover={{ 
        shadow: "lg",
        transform: "translateY(-2px)",
        transition: "all 0.2s"
      }}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Heading fontSize="xl">{post.title}</Heading>
        <Badge colorScheme="teal">{post.category}</Badge>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={2}>
        By {post.author} | {post.date}
      </Text>
      <Text noOfLines={3}>{post.content}</Text>
    </Box>
  )
}

export default BlogPostCard