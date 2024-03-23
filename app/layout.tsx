"use client";

import { AuthProvider } from "@propelauth/react";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
          <ChakraProvider>
            <Navbar />
            <div className="w-full flex flex-col justify-center items-center bg-champagne h-screen">
              <div className=" p-4 max-w-6xl w-full flex flex-col justify-center items-center ">
                {children}
              </div>
            </div>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
