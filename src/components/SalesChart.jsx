import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Fév", sales: 800 },
  { name: "Mar", sales: 1200 },
  { name: "Avr", sales: 900 },
  { name: "Mai", sales: 1600 },
];

export default function SalesChart() {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-3">📈 Ventes Mensuelles</h2>
      <LineChart width={400} height={250} data={data}>
        <Line type="monotone" dataKey="sales" stroke="#2563eb" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
