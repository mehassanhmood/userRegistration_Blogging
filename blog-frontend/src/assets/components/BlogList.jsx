import React from 'react'
import { VStack } from '@chakra-ui/react'
import BlogPostCard from './BlogPostCard'

const BlogList = ({ posts, onBlogClick }) => {
  return (
    <VStack spacing={6} align="stretch">
        {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} onClick={() => onBlogClick(post.id)} />
        ))}
    </VStack>
  )
}

export default BlogList