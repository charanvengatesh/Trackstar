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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BillInterface,
  CustomerInterface,
  checkCustomer,
  getBillsFromCustomerID,
} from "../api/nessie";
import { WithAuthInfoProps, withAuthInfo } from "@propelauth/react";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

const Dashboard = withAuthInfo((props: WithAuthInfoProps) => {
  const [customer, setCustomer] = useState<CustomerInterface>();
  let [bills, setBills] = useState<any>([]);

  useEffect(() => {
    if (props.isLoggedIn) {
      checkCustomer({ props, setCustomer, setBills });
    }
  }, [props.isLoggedIn]);

  useEffect(() => {
    const fetchBills = async () => {
      const billsData = await getBillsFromCustomerID(customer?._id ?? "");
      setBills(billsData);
    };

    if (customer) {
      fetchBills();
    }
  }, [customer]);

  const data = convertBillsToChartData(bills, "byDate");
  const data01 = convertBillsToPieChartData(bills);
  return (
    <div className="flex">
      <div className={`bg-slate-50 p-6 border-solid border-slate-400 border-2 m-2`}>
        {AreaChartModular(data)}
      </div>
      <div className={`bg-slate-100 border-solid border-slate-400 border-2 m-2`}>
        {PieChartModular(data01)}
      </div>
    </div>
  );
});

// create an area chart component
const AreaChartModular = (data: any[] | undefined) => {
  return (
    <ResponsiveContainer width={600} height={300}>
      <AreaChart
        width={500}
        height={500}
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
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const PieChartModular = (data: any[] | undefined) => {
  const colors = ["#82ca9d", "#8884d8", "#ffc658", "#ff7f0e", "#ff5e5b"];
  return (
    <ResponsiveContainer width={300} height={200}>
      <PieChart width={100} height={100}>
        <Pie
          dataKey="value"
          data={data}
          outerRadius={80}
          fill="#82ca9d"
        >
          {data &&
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const getFillColor = (index: number) => {
  const colors = ["#82ca9d", "#8884d8", "#ffc658", "#ff7f0e", "#ff5e5b"];
  return colors[index % colors.length];
};

// convert bill's nicknames to pie chart data
const convertBillsToPieChartData = (bills: BillInterface[]) => {
  let billsByCategory: { [key: string]: number } = {};
  if (Array.isArray(bills)) {
    billsByCategory = bills.reduce((acc, bill) => {
      if (!acc[bill.nickname ?? ""]) {
        acc[bill.nickname ?? ""] = 0;
      }
      acc[bill.nickname ?? ""] += bill.payment_amount;
      return acc;
    }, {} as { [key: string]: number });
  }
  return Object.keys(billsByCategory).map((nickname) => {
    return {
      name: nickname,
      value: billsByCategory[nickname],
    };
  });
};

// convert bills to a chart data
const convertBillsToChartData = (
  bills: BillInterface[],
  categorizingType: string
) => {
  // categorize bills by date or month
  let billsByCategory: { [key: string]: number } = {};
  if (Array.isArray(bills)) {
    billsByCategory = bills.reduce((acc, bill) => {
      let category;
      if (categorizingType === "byDate") {
        category = new Date(bill.payment_date).toLocaleDateString();
      } else if (categorizingType === "byMonth") {
        const date = new Date(bill.payment_date);
        category = `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;
      }
      if (!acc[category ?? ""]) {
        acc[category ?? ""] = 0;
      }
      acc[category ?? ""] += bill.payment_amount;
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
};

export default Dashboard;
