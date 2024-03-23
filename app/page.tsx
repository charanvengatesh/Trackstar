"use client";
import { Box, Button, Heading, StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
  WithAuthInfoProps,
} from "@propelauth/react";

import Login from "./components/Login";


export default function Page() {
  return (
    <main>
      <Login />
    </main>
  );
}

