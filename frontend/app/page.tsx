"use client";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";
import { Box, Heading, StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
  WithAuthInfoProps,
} from "@propelauth/react";

const NESSIE_API_KEY = "5ae6b5f82f06b944fee942faa27e114e";


export default function Page() {
  return (
    <main>
      <Login />
    </main>
  );
}

const Login = withAuthInfo((props: WithAuthInfoProps) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  const [customerStatus, setCustomerStatus] = useState<null | Boolean>(null);

  useEffect(() => {
    if (props.isLoggedIn) {
      checkIfCustomer();
    }
  }, [props.isLoggedIn]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.nessieisreal.com/customers?key=${NESSIE_API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkIfCustomer = async () => {
    const data = await fetchData();
    const customer = Array.isArray(data)
      ? data.find((customer) => customer.last_name === props.user?.email)
      : null;

    if (customer) {
      console.log("You are a customer");
      setCustomerStatus(true);
    } else {
      await addCustomer();
      setCustomerStatus(false);
    }
  };

  const addCustomer = async () => {
    try {
      const response = await fetch(
        `http://api.nessieisreal.com/customers?key=${NESSIE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: `${props.user?.firstName} ${props.user?.lastName}`,
            last_name: props.user?.email,
            address: {
              street_number: "test",
              street_name: "test",
              city: "test",
              state: "NA",
              zip: "00000",
            },
          }),
        }
      );
      if (response.ok) {
        console.log("Customer added successfully");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

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
