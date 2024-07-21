import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="flex justify-center relative bottom-0 p-4 background_color">
      <ul className="flex opacity-80 gap-4 text-sm font-medium text-[#343A40]">
        <Link className="hover:underline underline-offset-1" href="/">
          Home
        </Link>
        <Link className="hover:underline underline-offset-1" href="/About">
          About
        </Link>
        <a
          href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZdBjgWbxBbZDTrCXpcFTGNvMNhSDRqWtfsjNBkTVKqzcQvjRjtRGSBhzJgpgbwxXgwvBq"
          target="_blank"
          className="hover:underline underline-offset-1"
        >
          Contact & Feedback
        </a>
        <a
          className="hover:underline underline-offset-1"
          href="https://lalitsportfolio.vercel.app/"
          target="_blank"
        >
          Author
        </a>
      </ul>
    </div>
  );
};

export default Footer;
