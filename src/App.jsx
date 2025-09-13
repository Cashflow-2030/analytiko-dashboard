import React from "react";
import TrendingProducts from "./components/TrendingProducts.jsx";
import StatsCard from "./components/StatsCard.jsx";
import MonthlySalesChart from "./components/MonthlySalesChart.jsx";
import ExportCSV from "./components/ExportCSV.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">📊 Analytiko Dashboard</h1>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Ventes Totales" value="$12,340" />
        <StatsCard title="Clients Actifs" value="1,245" />
        <StatsCard title="Produits" value="320" />
      </div>

      {/* Produits tendances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TrendingProducts />
        <MonthlySalesChart />
      </div>

      {/* Export CSV */}
      <ExportCSV />
    </div>
  );
}
