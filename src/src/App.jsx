import React from 'react';
import TrendingProducts from './components/TrendingProducts';
import TopSales from './components/TopSales';
import Alerts from './components/Alerts';
import ExportCSV from './components/ExportCSV';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Analytiko Dashboard</h1>
      <TrendingProducts />
      <TopSales />
      <Alerts />
      <ExportCSV />
    </div>
  );
}

export default App;
