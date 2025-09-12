import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ProductList from "./components/ProductList.jsx";
import TrendingProducts from "./components/TrendingProducts.jsx";
import SalesChart from "./components/SalesChart.jsx";
import Alerts from "./components/Alerts.jsx";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data: prodData, error: prodError } = await supabase
        .from("products")
        .select("*");
      if (!prodError) setProducts(prodData);
    }

    async function loadSales() {
      const { data: salesData, error: salesError } = await supabase
        .from("sales")
        .select("*");
      if (!salesError) setSales(salesData);
    }

    loadProducts();
    loadSales();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Analytiko Dashboard</h1>
      <ProductList products={products} />
      <TrendingProducts products={products} sales={sales} />
      <SalesChart sales={sales} />
      <Alerts products={products} sales={sales} />
    </div>
  );
}
