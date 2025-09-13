import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      let { data, error } = await supabase
        .from('products')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) console.log(error);
      else setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Top Produits</h2>
      {products.length > 0 ? (
        <BarChart width={600} height={300} data={products}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="id" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>Chargement des produits...</p>
      )}
    </div>
  );
}
