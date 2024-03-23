import { BillInterface } from "./nessie";

export const dummyBills: BillInterface[] = [
  {
    status: "pending",
    payee: "CHIPOTLE F A GUAD",
    nickname: "default",
    payment_date: "2024-03-23",
    recurring_date: 1,
    payment_amount: 9.7,
  },
  {
    status: "pending",
    payee: "TEST F A GUAD",
    nickname: "default",
    payment_date: "2024-03-23",
    recurring_date: 1,
    payment_amount: 9.7,
  },
];
