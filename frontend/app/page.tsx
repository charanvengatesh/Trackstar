"use client";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";
import { Box, Heading, StackDivider, VStack } from "@chakra-ui/react";

const Home = withAuthInfo((props: WithAuthInfoProps) => {
  if (!props.isLoggedIn) return <>You are not logged in!</>;
  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Hey, {props.user.firstName}!</Heading>
        <p className="text-2xl"> Here is a list of your transactions...</p>
      </div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={1}
        align="stretch"
      >
        <Box h="40px" bg="yellow.200">
          1
        </Box>
        <Box h="40px" bg="tomato">
          2
        </Box>
        <Box h="40px" bg="pink.100">
          3
        </Box>
      </VStack>
    </div>
  );
});

export default Home;
