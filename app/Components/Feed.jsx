import React, { useState, useEffect } from "react";

import BlogCard from "./BlogCard";

const Feed = ({ search }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/prompt`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        const data = await response.json();
        if (search) {
          const searchData = data.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())
          );
          setPost(searchData);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    })();
  }, [search]);

  return (
    <div>
      {post.length > 0 ? (
        <BlogCard data={post} />
      ) : (
        <h1 className="text-center text-xl font-bold text-[#343A40]">
          Nothing to show 😕
        </h1>
      )}
    </div>
  );
};

export default Feed;
