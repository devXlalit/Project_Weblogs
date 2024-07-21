"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
const Edit = () => {
  const searchPrams = useSearchParams();
  const router = useRouter();

  const blogId = searchPrams.get("id");
  const [submiting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ title: "", desc: "", main_content: "" });

  useEffect(() => {
    const getPost = async () => {
      const result = await fetch(`/api/prompt/${blogId}`);
      const data = await result.json();

      setPost({
        title: data.title,
        desc: data.desc,
        main_content: data.main_content,
      });
    };
    if (blogId) getPost();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!blogId) return alert("Something went wrong blog id missing!");

    try {
      const response = await fetch(`/api/prompt/${blogId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          desc: post.desc,
          main_content: post.main_content,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="p-12 background_color"
    >
      <h1 className="text-5xl greadient_text inline-block">Edit Blog</h1>

      <form className="py-4 md:p-6" onSubmit={handleSubmit}>
        <input
          className="bg-neutral-200 text-2xl outline-none mb-4 text-[#343A40] w-full py-4 px-4 rounded-xl"
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          className="bg-neutral-200 text-2xl mb-4 outline-none text-[#343A40] w-full py-4 px-4 rounded-xl"
          rows={5}
          type="text"
          placeholder="Description"
          value={post.desc}
          onChange={(e) => setPost({ ...post, desc: e.target.value })}
        />
        <textarea
          className="bg-neutral-200 mb-4 text-2xl min-h-56 outline-none text-[#343A40] w-full py-4 px-4 rounded-xl"
          rows={10}
          type="text"
          placeholder="Main content"
          value={post.main_content}
          onChange={(e) => setPost({ ...post, main_content: e.target.value })}
        />
        <div className="flex gap-2">
          <button className="blue_btn font-bold">
            Upload{submiting && "..."}
          </button>
          <Link href="/Profile">
            <button className="blue_btn font-bold">Cancel</button>
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Edit;
