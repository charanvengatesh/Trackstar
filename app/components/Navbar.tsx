import React from "react";
import LoginButton from "./LoginButton";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import Link from "next/link";

const Navbar = withAuthInfo((props: WithAuthInfoProps) => {
  return (
    <div className="w-full fixed bg-bittersweet text-white flex justify-center ">
      <div className="w-full max-w-6xl  flex justify-between items-center top-0  p-4 ">
        <p className="  text-2xl">⭐️ Trackstar</p>
        <div className="flex gap-4 items-center  text-md">
          <Link href="/">
            <p>home</p>
          </Link>
          <Link href="/dashboard">
            <p>dashboard</p>
          </Link>

          <LoginButton />
        </div>
      </div>
    </div>
  );
});

export default Navbar;
