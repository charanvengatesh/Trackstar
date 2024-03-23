// generate a BillBox component
import React from 'react';


export default function BillBox({ name, amount, date } : { name: string, amount: number, date: string }) {
  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 ">
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