// generate a BillBox component
import React from 'react';


export default function BillBox() {
  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div>
          <p className="text-lg font-bold">Electricity Bill</p>
          <p className="text-sm">Due on 12/12/2021</p>
        </div>
        <div>
          <p className="text-lg font-bold">$100</p>
        </div>
      </div>
    </div>
  );
}