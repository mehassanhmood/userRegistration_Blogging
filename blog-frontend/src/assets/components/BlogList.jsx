import React from 'react'
import { VStack } from '@chakra-ui/react'
import BlogPostCard from './BlogPostCard'

const BlogList = ({ posts }) => {
  return (
    <VStack spacing={6} align="stretch">
        {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
        ))}
    </VStack>
  )
}

export default BlogList