import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🔹 Remplace par ton URL et Anon Key
const SUPABASE_URL = "https://fwbdtmdbfysmwgwsqapf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3YmR0bWRiZnlzbXdnd3NxYXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTM1MzcsImV4cCI6MjA3MjMyOTUzN30.Z_KLvtvMW0V2u3awP32OIL960usMGCGh32Q4_MexIxQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const App = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // 🔹 Charger les boutiques
  const fetchShops = async () => {
    const { data, error } = await supabase.from("shops").select("*");
    if (error) console.error("Erreur shops:", error);
    else setShops(data);
  };

  // 🔹 Charger les produits
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Erreur products:", error);
    else setProducts(data);
  };

  // 🔹 Trending Products
  const computeTrendingProducts = () => {
    const sorted = [...products].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
    setTrendingProducts(sorted.slice(0, 5));
  };

  // 🔹 Alertes produits
  const computeAlerts = () => {
    const alertsList = products.filter((p) => (p.sales_count || 0) > 50);
    setAlerts(alertsList);
  };

  // 🔹 Export CSV
  const exportCSV = () => {
    const header = "ID,Titre,Handle,Boutique,Sales\n";
    const rows = products
      .map(
        (p) => `${p.id},${p.title},${p.handle},${p.shop_id},${p.sales_count || 0}`
      )
      .join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchShops();
      await fetchProducts();
      computeTrendingProducts();
      computeAlerts();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Chargement des données...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Analytiko Dashboard</h1>

      {/* 🔹 Boutiques */}
      <section>
        <h2>Boutiques</h2>
        <ul>
          {shops.map((shop) => (
            <li key={shop.id}>{shop.domain} (ID: {shop.id})</li>
          ))}
        </ul>
      </section>

      {/* 🔹 Produits */}
      <section>
        <h2>Produits</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} – Boutique ID: {product.shop_id} – Ventes: {product.sales_count || 0}
            </li>
          ))}
        </ul>
      </section>

      {/* 🔹 Trending Products */}
      <section>
        <h2>Trending Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendingProducts}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales_count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 🔹 Alertes produits */}
      <section>
        <h2>Alertes Produits</h2>
        <ul>
          {alerts.map((p) => (
            <li key={p.id}>
              {p.title} – Ventes: {p.sales_count || 0} ⚠️
            </li>
          ))}
        </ul>
      </section>

      {/* 🔹 Export CSV */}
      <button onClick={exportCSV} style={{ marginTop: "20px" }}>
        Exporter CSV des produits
      </button>
    </div>
  );
};

export default App;
