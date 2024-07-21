import React, { useState, useEffect } from "react";

import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { LazyMotion, domAnimation, loadComponents, m } from "framer-motion";

const Feed = ({ search }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      if (search) {
        const searchData = data.filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase())
        );
        setPost(searchData);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [search]);

  return (
    <div>
      <BlogCard data={post} />
    </div>
  );
};

export default Feed;
