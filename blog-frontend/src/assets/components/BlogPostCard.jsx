import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const BlogPostCard = ({post}) => {
  return (
    <Box p="5" shadow={"lg"} borderWidth={"1px"} mb={"4"}
        bg={"purple.200"} boxShadow={"lg"} borderRadius={"lg"}
        _hover={{ boxShadow: "2xl", transform: "translateY(-4px)", transition: "all 0.3s" }}
        >
        <Heading fontSize={"xl"}>{post.title}</Heading>
        <Text mt={"4"}>{post.content}</Text>
    </Box>
  )
}

export default BlogPostCard
