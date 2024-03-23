import { WithAuthInfoProps } from "@propelauth/react";

export interface BillInterface {
  status: string;
  payee: string;
  nickname: string;
  payment_date: string;
  recurring_date: number;
  payment_amount: number;
}

export interface CustomerInterface {
  address: {};
  first_name: string;
  last_name: string;
  _id: string;
}

export const fetchCustomers = async () => {
  try {
    const response = await fetch(
      `http://api.nessieisreal.com/customers?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const checkCustomer = async ({
  props,
  setCustomer,
}: {
  props: WithAuthInfoProps;
  setCustomer: Function;
}) => {
  const data = await fetchCustomers();
  const customer = Array.isArray(data)
    ? data.find((customer) => customer.last_name === props.user?.email)
    : null;
  if (!customer) {
    await addCustomer({ props, setCustomer });
    return;
  }
  setCustomer(customer);
};

export const addCustomer = async ({
  props,
  setCustomer,
}: {
  props: WithAuthInfoProps;
  setCustomer: Function;
}) => {
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
      setCustomer(customer);
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

export const getBillsFromAccountID = async (
  customerId: string,
  nickname: string
) => {
  try {
    const accountId = await getAccountFromCustomerID(customerId, nickname);
    const response = await fetch(
      `http://api.nessieisreal.com/accounts/${accountId}/bills?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bills:", error);
  }
};

export const getAccountFromCustomerID = async (
  customerId: string,
  nickname: string
) => {
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
};

export const addBillFromCustomerID = async (
  customerId: string,
  nickname: string,
  name: string,
  amount: number
) => {
  try {
    const accountId = await getAccountFromCustomerID(customerId, nickname);
    const bill: BillInterface = {
      status: "done",
      payee: "CHICK FIL A",
      nickname: "fast food",
      payment_date: "2022-01-01",
      recurring_date: 1,
      payment_amount: 6.7,
    };

    const response = await fetch(
      `http://api.nessieisreal.com/accounts/${accountId}/bills?key=${process.env.NEXT_PUBLIC_NESSIE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
      }
    );
    if (response.ok) {
      console.log("Bill added successfully");
    }
  } catch (error) {
    console.error("Error adding bill:", error);
  }
};
