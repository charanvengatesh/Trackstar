"use client";
import { Box, Button, Heading, StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import BillBox from "./components/BillBox";
import {
  addBillFromCustomerID,
  BillInterface,
  checkCustomer,
  CustomerInterface,
} from "./api/nessie";
import { dummyBills } from "./api/script";

const Login = withAuthInfo((props: WithAuthInfoProps) => {
  const [customer, setCustomer] = useState<CustomerInterface>();
  const [bills, setBills] = useState<BillInterface[]>([]);
  const [dummyAdded, setDummyAdded] = useState<Boolean>(false);
  // checks if user is customer
  useEffect(() => {
    if (props.isLoggedIn) {
      checkCustomer({ props, setCustomer, setBills });
    }
  }, [props.isLoggedIn]);

  // dummy transaction values
  function addDummyBills() {
    if (customer != null) {
      let customer_id = customer._id;
      for (let bill of dummyBills) {
        addBillFromCustomerID(customer_id, bill);
      }
      setDummyAdded(true);
    }
  }

  if (!props.isLoggedIn) {
    return <Heading>You are not loggend in!</Heading>;
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        {!dummyAdded && (
          <Button onClick={addDummyBills}>Add Transactions</Button>
        )}
        <Heading>Hey, {props.user?.firstName}!</Heading>
        <p className="text-2xl"> Here is a list of your transactions...</p>
      </div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={1}
        align="stretch"
      >
        {Array.isArray(bills) &&
          bills.map((bill: any, index) => {
            const nicknameParts = bill.nickname ? bill.nickname.split(" ") : "";
            const tag = nicknameParts[0];
            return (
              <BillBox
                key={index}
                name={bill.payee}
                amount={bill.payment_amount}
                date={bill.payment_date}
                tag={tag}
              />
            );
          })}
      </VStack>
    </div>
  );
});

export default Login;
