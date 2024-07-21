import React, { useState, useEffect } from "react";

import BlogCard from "./BlogCard";

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
  }, [search, post]);

  return (
    <div>
      <BlogCard data={post} />
    </div>
  );
};

export default Feed;
