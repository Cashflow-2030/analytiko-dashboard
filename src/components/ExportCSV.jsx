import React from "react";

export default function ExportCSV() {
  const handleExport = () => {
    alert("Export CSV (à implémenter avec vos données Supabase)");
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-8">
      <h2 className="font-semibold text-lg mb-3">📤 Exporter les données</h2>
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Exporter en CSV
      </button>
    </div>
  );
}
