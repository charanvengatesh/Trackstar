"use client";

import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BillInterface, CustomerInterface, checkCustomer, getBillsFromAccountID } from "../api/nessie";
import { WithAuthInfoProps, withAuthInfo } from "@propelauth/react";


// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const Dashboard = withAuthInfo((props: WithAuthInfoProps) => {
  const [customer, setCustomer] = useState<CustomerInterface>();
  let [bills, setBills] = useState<any>([]);

  useEffect(() => {
    if (props.isLoggedIn) {
      checkCustomer({ props, setCustomer });
    }
  }, [props.isLoggedIn]);

  useEffect(() => {
    const fetchBills = async () => {
      const billsData = await getBillsFromAccountID(customer?._id ?? "", "Primary");
      setBills(billsData);
      
    };

    if (customer) {
      fetchBills();
    }
  }, [customer]);

  const data = convertBillsToChartData(bills, "byDate");
  return <div className={`bg-white p-6 rounded-md`}>{AreaChartModular(data)}</div>;
});


// create an area chart component
const AreaChartModular = (data: any[] | undefined) => {
  return (
    <ResponsiveContainer width={500} height={300}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// convert bills to a chart data
const convertBillsToChartData = (bills: BillInterface[], categorizingType: string) => {
  // categorize bills by date or month
  let billsByCategory: { [key: string]: number } = {};
  if (Array.isArray(bills)) {
    billsByCategory = bills.reduce((acc, bill) => {
      let category;
      if (categorizingType === "byDate") {
        category = new Date(bill.payment_date).toLocaleDateString();
      } else if (categorizingType === "byMonth") {
        const date = new Date(bill.payment_date);
        category = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
      }
      console.log(category);
      if (!acc[category??""]) {
        acc[category??""] = 0;
      }
      acc[category??""] += bill.payment_amount;
      return acc;
    }, {} as { [key: string]: number });
  }
  // sort billsByCategory by category in ascending order
  const sortedBillsByCategory = Object.entries(billsByCategory).sort((a, b) => {
    const categoryA = new Date(a[0]);
    const categoryB = new Date(b[0]);
    return categoryA.getTime() - categoryB.getTime();
  });
  billsByCategory = Object.fromEntries(sortedBillsByCategory);
  // convert to chart data
  return Object.keys(billsByCategory).map((category) => {
    return {
      date: category,
      amount: billsByCategory[category],
    };
  });
}

export default Dashboard;