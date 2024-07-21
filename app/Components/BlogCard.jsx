"use client";
import React from "react";
import BlogCardlist from "./BlogCardlist";
import { motion } from "framer-motion";
const BlogCard = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-2 md:px-6 py-10 lg:grid-cols-3 gap-6 md:gap-4"
    >
      {data.map((post) => (
        <BlogCardlist key={post._id} post={post} />
      ))}
    </motion.div>
  );
};

export default BlogCard;
