import React from "react";
import LoginButton from "./LoginButton";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";

const Navbar = withAuthInfo((props: WithAuthInfoProps) => {
  return (
    <div className="w-full fixed flex justify-between items-center top-0 bg-bittersweet text-white p-4 px-12">
      <p className="  text-2xl">⭐️ Trackstar</p>
      <div className="flex gap-2 items-center">
        {props.isLoggedIn && <p>Hey, {props.user.firstName}!</p>}
        <LoginButton />
      </div>
    </div>
  );
});

export default Navbar;
