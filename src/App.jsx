import React from "react";
import TrendingProducts from "./components/TrendingProducts.jsx";
import SalesChart from "./components/SalesChart.jsx";
import StatsCard from "./components/StatsCard.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Analytiko Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Ventes Totales" value="$12,340" />
        <StatsCard title="Clients Actifs" value="1,245" />
        <StatsCard title="Produits" value="320" />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendingProducts />
        <SalesChart />
      </div>
    </div>
  );
}
