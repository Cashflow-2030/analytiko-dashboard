import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { supabase } from "../supabaseClient";

export default function MonthlySalesChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      let { data, error } = await supabase
        .from("sales")
        .select("id, product_id, amount, created_at");

      if (error) {
        console.error(error);
        return;
      }

      // Transformer les ventes en total par mois
      const monthlyTotals = {};

      data.forEach((sale) => {
        const date = new Date(sale.created_at);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (!monthlyTotals[month]) monthlyTotals[month] = 0;
        monthlyTotals[month] += sale.amount;
      });

      const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        name: month,
        sales: total,
      }));

      setSalesData(chartData);
    };

    fetchSales();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-3">📈 Ventes Mensuelles</h2>
      <LineChart width={400} height={250} data={salesData}>
        <Line type="monotone" dataKey="sales" stroke="#2563eb" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
