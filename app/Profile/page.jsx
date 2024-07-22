"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import BlogCard from "../Components/BlogCard";

const Profile = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPost(data);
    };
    if (session?.user.id) fetchPost();
  });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-6 md:p-12 min-h-screen background_color"
      >
        <div className="flex gap-2 items-center pb-6">
          <Image
            className="rounded-full"
            src={session?.user.image}
            height={45}
            width={45}
            alt="profile image"
          />
          <span>
            <h3 className="leading-tight font-semibold text-md text-[#343A40]">
              {session?.user.name}
            </h3>
            <p className="leading-tight font-normal opacity-75 text-sm">
              {session?.user.email}
            </p>
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-center ">
          <h1 className="text-4xl md:text-5xl greadient_text">My Blogs</h1>
          <Link href="/Create">
            <button className="blue_btn font-bold my-4">Create</button>
          </Link>
        </div>
        <BlogCard data={post} />
      </motion.div>
      <hr />
      <Footer />
    </>
  );
};

export default Profile;
