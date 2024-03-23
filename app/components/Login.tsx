import { Box, Button, Heading, StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
  WithAuthInfoProps,
} from "@propelauth/react";
import exp from "constants";

const Login = withAuthInfo((props: WithAuthInfoProps) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  const [customerStatus, setCustomerStatus] = useState<null | Boolean>(null);
  const [bills, setBills] = useState<any>([]);

  useEffect(() => {
    if (props.isLoggedIn) {
      checkCustomerStatus();
    }
  }, [props.isLoggedIn]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.nessieisreal.com/customers?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkCustomerStatus = async () => {
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
        `http://api.nessieisreal.com/customers?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`,
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
      // If the customer is added successfully, add a primary account
      try {
        const customer = await response.json();
        const customerObj = customer.objectCreated;

        const response2: Response = await fetch(
          `http://api.nessieisreal.com/customers/${customerObj._id}/accounts?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "Checking",
              nickname: "Primary",
              rewards: 0,
              balance: 0,
              account_number: "0000000000000000",
            }),
          }
        );
        if (response2.ok) {
          console.log("Primary account added successfully");
        }
      } catch (error) {
        console.error("Error adding primary account:", error);
      }

      if (response.ok) {
        console.log("Customer added successfully");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  // get bills for account and add them to the state
  const getBills = async (customerId: string, nickname: string) => {
    try {
      const accountId = await getAccountId(customerId, nickname);
      const response = await fetch(
        `http://api.nessieisreal.com/accounts/${accountId}/bills?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`
      );
      const data = await response.json();
      setBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  getBills("65fe97fd9683f20dd5189858", "Primary");
  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Hey, {props.user?.firstName}!</Heading>
        <p className="text-2xl"> Here is a list of your transactions...</p>
      </div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={1}
        align="stretch"
      >
        {Array.isArray(bills) &&
          bills.map((bill: any, index) => (
            <Box key={index} h="40px" bg="yellow.200">
              {bill.payee}
            </Box>
          ))}
      </VStack>
    </div>
  );
});


// find id of account using customer id and nickname
const getAccountId = async (customerId: string, nickname: string) => {
  try {
    const response = await fetch(
      `http://api.nessieisreal.com/customers/${customerId}/accounts?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`
    );
    const data = await response.json();
    const account = Array.isArray(data)
      ? data.find((account) => account.nickname === nickname)
      : null;
    return account?._id;
  } catch (error) {
    console.error("Error fetching account:", error);
  }
}


  

// add bill to account
const addPurchase = async (customerId: string, nickname: string, name: string, amount: number) => {
  try {
    const accountId = await getAccountId(customerId, nickname);
    const response = await fetch(
      `http://api.nessieisreal.com/accounts/${accountId}/bills?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "pending",
          payee: name,
          nickname: name,
          payment_date: "2022-01-01",
          recurring_date: 1,
          payment_amount: amount,
        }),
      }
    );
    if (response.ok) {
      console.log("Bill added successfully");
    }
  } catch (error) {
    console.error("Error adding bill:", error);
  }
};



export default Login;