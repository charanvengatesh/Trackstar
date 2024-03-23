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
            <div className="bg-black">
            <Navbar />
            <div className="flex h-screen bg-champagne flex-col justify-center items-center">
              {children}
            </div></div>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
