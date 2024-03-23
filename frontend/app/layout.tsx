"use client";

import { AuthProvider } from "@propelauth/react";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
          <ChakraProvider>{children} </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
