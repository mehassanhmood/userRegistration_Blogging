import React from 'react'
import { Stack } from '@chakra-ui/react'
import BlogPostCard from './BlogPostCard'

const BlogList = ({ posts }) => {
  return (
    <Stack spacing={"6"}>
        
        {
            posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))
        }
    </Stack>
  )
}

export default BlogList
