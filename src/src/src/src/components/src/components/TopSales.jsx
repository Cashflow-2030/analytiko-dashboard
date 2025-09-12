import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

export default function TopSales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      let { data, error } = await supabase
        .from('sales')
        .select('product_id, quantity')
        .order('quantity', { ascending: false })
        .limit(5);
      if (error) console.log(error);
      else setSales(data.map((s) => ({ name: s.product_id, value: s.quantity })));
    }
    fetchSales();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  return (
    <div>
      <h2>Top Ventes</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={sales}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {sales.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
