"use client";
import Feed from "./Components/Feed";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [searchText, setsearchText] = useState("");

  const handleChange = (e) => {
    setsearchText(e.target.value);
  };
  return (
    <>
      <div className="background_color p-12 w-full min-h-screen">
        <Nav />
        <main>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className=" text-center text-5xl pb-2 md:text-8xl mt-20 font-bold greadient_text"
          >
            WEBLOGS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-center text-sm md:text-xl leading-tight font-normal opacity-80 text-[#343A40] pb-6"
          >
            A Free and Open source bloging website for Content Creators and
            Developers.
            <br /> Create blogs and share on your social media.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center pb-10"
          >
            <input
              className="shadow-2xl  shadow-[#3572EF]/50 outline-none py-2 px-2 w-2/5 rounded-lg"
              type="search"
              onChange={handleChange}
              placeholder="Search your blog topic here.."
            />
          </motion.div>
          <Feed search={searchText} />
        </main>
      </div>
      <hr />
      <Footer />
    </>
  );
}
