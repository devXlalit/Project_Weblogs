"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
const BlogCardlist = ({ post }) => {
  useEffect(() => {
    
  }, [post.title]);
  return (
    <Link
      href={{
        pathname: "/Blogpage",
        query: { id: post._id },
      }}
    >
      <div className="p-6 shadow-lg outline outline-1 outline-slate-500 rounded-3xl hover:scale-105 duration-300 ease-in-out">
        <div className="flex gap-2 items-center pb-2">
          <Image
            className="rounded-full"
            src={post.creator.image}
            height={35}
            width={35}
            alt="profile image"
          />
          <span>
            <h3 className="leading-tight font-semibold text-sm text-[#343A40]">
              {post.creator.username}
            </h3>
            <p className="leading-tight font-normal opacity-75 text-xs">
              {post.creator.email}
            </p>
          </span>
        </div>
        <h1 className="text-xl p-2 font-medium leading-none text-[#343A40]">
          {post.title}
        </h1>
      </div>
    </Link>
  );
};

export default BlogCardlist;
