"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "animate.css";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    const setUpProviders = async () => {
      const result = await getProviders();
      setProviders(result);
    };
    setUpProviders();
  });
  return (
    <nav className="flex justify-between w-full">
      <Link
        href="/"
        className="text-3xl font-extrabold tracking-[-9px]  text-[#343A40]"
      >
        WB
      </Link>
      {session?.user ? (
        <ul className="flex gap-2">
          <button onClick={signOut} className="black_btn tracking-tighter">
            Sign out
          </button>
          <Link href="/Profile">
            <Image
              className="rounded-full"
              src={session.user.image}
              height={40}
              width={40}
              alt="Profile image google"
            />
          </Link>
        </ul>
      ) : (
        <ul>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="animate__animated animate__pulse animate__infinite black_btn tracking-tighter "
              >
                Sign In
              </button>
            ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
