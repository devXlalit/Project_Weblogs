"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { RiLink, RiShareLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { delay, motion, scrollYProgress, useScroll } from "framer-motion";
const page = () => {
  const searchPrams = useSearchParams();

  const blogId = searchPrams.get("id");
  const [showCopy, setShowCopy] = useState(false);
  const [Copytext, setCopytext] = useState("Copy");
  const [post, setPost] = useState({});
  const [creator, setCreator] = useState({});
  const { data: session } = useSession();
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${blogId}`);
      const data = await response.json();
      setPost(data);
      setCreator(data.creator);
    };
    fetchPost();
  });

  const handleShare = () => {
    setCopytext("Copied");
    setTimeout(() => {
      setCopytext("Copy");
    }, 3000);
    const currUrl = window.location.href;
    console.log(window.location);
    navigator.clipboard.writeText(currUrl);
  };

  const handleEdit = (post) => {
    router.push(`/Edit?id=${blogId}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delet this blog?");
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${blogId}`, {
          method: "DELETE",
        }).then(router.push("/"));
        const filteredPosts = post.filter((p) => p._id !== post._id);
        setPost(filteredPosts);
      } catch (err) {
        console.log("There is some problem while deleting this post", err);
      }
    }
  };

  const processContent = (content) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      const sentenceCount = line.split(/[.!?]+/).filter(Boolean).length;

      const isShortLine = sentenceCount < 2;

      return isShortLine ? (
        <span key={index} className="font-bold block pb-2">
          {line}
        </span>
      ) : (
        <span key={index} className="block leading-6">
          {line}
        </span>
      );
    });
  };

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
        className="h-1 rounded-full overflow-hidden z-10 w-full bg-[#3572EF] fixed top-0"
      ></motion.div>
      <div className="min-h-screen background_color p-12">
        {session ? (
          <div className="flex gap-2 items-center pb-6">
            <Image
              className="rounded-full"
              src={creator.image}
              height={45}
              width={45}
              alt="profile image"
            />
            <span>
              <h3 className="leading-tight font-semibold text-md text-[#343A40]">
                {creator.username}
              </h3>
              <p className="leading-tight font-normal opacity-75 text-sm">
                {creator.email}
              </p>
            </span>
            <span className="absolute right-12">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
                type="button"
              >
                <RiShareLine
                  className="cursor-pointer"
                  color="#343A40"
                  onMouseEnter={() => {
                    setShowCopy(true);
                  }}
                  onMouseLeave={() => {
                    setShowCopy(false);
                  }}
                  onClick={handleShare}
                />
              </motion.button>
            </span>
            {showCopy && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 1 }}
                animate={{
                  stdDeviation: showCopy ? 0 : 2,
                  opacity: 1,
                  scale: 1,
                  y: 5,
                }}
                transition={{ delay: 0.2 }}
                className="flex absolute right-6 top-20 items-center gap-1 text-sm shadow-md rounded-xl p-2  "
              >
                {Copytext} <RiLink size={20} color="#050C9C" />
              </motion.div>
            )}
          </div>
        ) : (
          <div className="pb-4">
            <Nav />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="md:px-6 py-4"
        >
          {/* <motion.div className="flex justify-center pb-10">
            {/* <iframe
              className="rounded-xl"
              width="560"
              height="315"
              src="https://youtube.com/embed/C6WJiUNZf7U?si=vxfKw2FDoNLvkFKw "
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> */}
          {/* <Image src="/ltc.jpg" height={0} width={600} alt="Banner image" />
          </div> */}
          <h1 className="text-2xl leading-7 md:text-4xl font-semibold text-[#343A40]">
            {post.title}
          </h1>
          <h3 className="md:text-xl pt-4 text-wrap  opacity-65 italic leading-tight">
            {post.desc}
          </h3>
          {/* *Feature update  */}

          <p
            className={`text-sm pt-10 whitespace-pre-wrap md:text-lg text-[#343A40] leading-normal`}
          >
            {post.main_content && processContent(post.main_content)}
          </p>
          {session?.user.email == creator.email && (
            <span className="flex gap-2 py-10">
              <button className="blue_btn font-bold" onClick={handleEdit}>
                Edit
              </button>
              <button className="blue_btn font-bold" onClick={handleDelete}>
                Delete
              </button>
            </span>
          )}
        </motion.div>
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default page;
