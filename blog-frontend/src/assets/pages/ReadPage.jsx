import React from 'react';
import { Box, Heading, transition } from '@chakra-ui/react';
import BlogContainer from '../components/BlogContainer';
import { motion } from "framer-motion"


const ReadPage = () => {
  const text = "Read Blogs"
  const letters = text.split("");

  const letterAnimation = {
    hidden: {opacity: 0,},
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease:[0.42, 0, 0.58, 0]
      }
    })
  };
  return (
    <Box>
      {/* <Heading mb={4}>Read Blogs</Heading>
       */}
      <Heading display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"6"} padding={"6"}>
         {letters.map((letter, index) => (
        <motion.span
        key = {index}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={letterAnimation}
        >
          {letter === " " ? "\u00A0": letter}

        </motion.span>
       ))}
      </Heading>
      <BlogContainer />
    </Box>
  );
};

export default ReadPage;