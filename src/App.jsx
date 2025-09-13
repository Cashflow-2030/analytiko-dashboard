import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [totalSales, setTotalSales] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    // Ventes Totales
    const { data: salesData } = await supabase.from('sales').select('amount');
    setTotalSales(salesData?.reduce((sum, s) => sum + s.amount, 0) || 0);

    // Clients actifs
    const { data: clientsData } = await supabase.from('clients').select('id');
    setActiveClients(clientsData?.length || 0);

    // Produits
    const { data: productsData } = await supabase.from('products').select('id');
    setTotalProducts(productsData?.length || 0);

    // Produits tendances
    const { data: trendingData } = await supabase
      .from('products')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(5);
    setTrendingProducts(trendingData || []);

    // Ventes mensuelles
    const { data: monthlyData } = await supabase.rpc('get_monthly_sales'); // ou table avec group by
    setMonthlySales(monthlyData || []);
  }

  return (
    <div className="container">
      <h1>📊 Analytiko Dashboard</h1>
      <div>
        <h2>Ventes Totales</h2>
        <p>${totalSales.toLocaleString()}</p>
      </div>
      <div>
        <h2>Clients Actifs</h2>
        <p>{activeClients.toLocaleString()}</p>
      </div>
      <div>
        <h2>Produits</h2>
        <p>{totalProducts}</p>
      </div>

      <div>
        <h2>🔥 Produits Tendances</h2>
        {trendingProducts.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          <ul>
            {trendingProducts.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>📈 Ventes Mensuelles</h2>
        {monthlySales.length === 0 ? (
          <p>Aucune vente ce mois-ci.</p>
        ) : (
          <div>
            {/* Ici, tu peux mettre ton chart */}
            <pre>{JSON.stringify(monthlySales, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            const csvContent = [
              ['Produit', 'Montant'],
              ...(monthlySales.map((s) => [s.product_name, s.amount]) || []),
            ]
              .map((e) => e.join(','))
              .join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ventes.csv';
            link.click();
          }}
        >
          📤 Exporter les données
        </button>
      </div>
    </div>
  );
}

export default App;
