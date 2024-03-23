// generate a BillBox component
import React from 'react';


export default function BillBox({ name, amount, date, tag } : { name: string, amount: number, date: string, tag: string}) {

  let color;
  if (tag === "food") {
    color = "bg-yellow-100";
  } else if (tag === "rent") {
    color = "bg-red-100";
  } else if (tag === "utilities") {
    color = "bg-green-100";
  }  else {
    color = "bg-gray-100";
  }

  return (
    <div>
      <div className={`flex justify-between items-center p-4 ${color}`}>
        <div>
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm">{date}</p>
        </div>
        <div>
          <p className="text-lg font-bold">${amount}</p>
        </div>
      </div>
    </div>
  );
}

// example usage:
// <BillBox name="Rent" amount={1200} date="1/1/2022" />