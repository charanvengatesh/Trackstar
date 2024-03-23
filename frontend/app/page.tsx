"use client";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";

const Home = withAuthInfo((props: WithAuthInfoProps) => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen bg-champagne flex-col justify-center items-center"></div>
    </div>
  );
});

export default Home;
