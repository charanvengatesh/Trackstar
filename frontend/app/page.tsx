"use client";
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
  const [hasCheckedCustomer, setHasCheckedCustomer] = useState(false);

  useEffect(() => {
    if (props.isLoggedIn && !hasCheckedCustomer) {
      checkIfCustomer();
      setHasCheckedCustomer(true);
    }
  }, [props.isLoggedIn, hasCheckedCustomer]);


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

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in as {props.user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={() => logoutFunction(true)}>Logout</button>
        {customerStatus === false && (
          <p>Successfully added as a new customer!</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => redirectToLoginPage()}>Login</button>
        <button onClick={() => redirectToSignupPage()}>Signup</button>
      </div>
    );
  }
});
