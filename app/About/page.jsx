"use client";
import {
  RiArrowRightUpLine,
  RiCupLine,
  RiGitRepositoryLine,
} from "@remixicon/react";
import React from "react";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
const page = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-12 w-full min-h-screen background_color"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-10 text-5xl  md:text-6xl font-bold greadient_text"
        >
          About Us
        </motion.h1>
        <p className="text-center">
          This is a open source project created by -{" "}
          <a
            className="underline underline-offset-1"
            href="https://lalitsportfolio.vercel.app/"
            target="_blank"
          >
            Lalit
          </a>
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center py-10 md:gap-10 flex-wrap"
        >
          <div className="mt-10 md:w-80 p-4 md:p-6 shadow-lg border-2 border-[#252A34] rounded-2xl">
            <h2 className="md:text-xl">
              <b className="flex">
                Github <RiArrowRightUpLine />
              </b>
              Feel free to contribute.
              <br /> also if your like it give it a star ⭐ on Github
            </h2>
            <button className="hover:scale-105 duration-300">
              <a
                href="https://github.com/devXlalit/useApi-Hook"
                target="__blank"
                className="font-extrabold flex items-center gap-1 bg-[#252A34] text-[#EAEAEA] text-center  mt-3 py-2 px-4 rounded-full"
              >
                <RiGitRepositoryLine /> Visit
              </a>
            </button>
          </div>
          <div className="mt-10 md:w-80 p-4 md:p-6 border-2 bg-white border-[#252A34] rounded-2xl">
            <h2 className="md:text-xl">
              Want me to add some more features and functionality to this
              website??
            </h2>
            <button>
              <a
                href="https://www.buymeacoffee.com/lalitpagarx"
                target="__blank"
                className="font-extrabold flex items-center gap-1 bg-[#ffd43b] text-[#252A34] hover:scale-105 duration-300 text-center mt-3 py-2 px-4 rounded-full"
              >
                <RiCupLine /> Buy Me a Coffee
              </a>
            </button>
          </div>
        </motion.div>
      </motion.div>
      <hr />
      <Footer />
    </>
  );
};

export default page;
