import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [totalSales, setTotalSales] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);

    // Ventes Totales
    const { data: salesData, error: salesError } = await supabase
      .from('sales')
      .select('amount');
    if (salesError) console.log('Erreur ventes', salesError);
    setTotalSales(salesData?.reduce((sum, s) => sum + s.amount, 0) || 0);

    // Clients actifs
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('id');
    if (clientsError) console.log('Erreur clients', clientsError);
    setActiveClients(clientsData?.length || 0);

    // Produits
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id,name,price')
      .limit(5);
    if (productsError) console.log('Erreur produits', productsError);
    setTotalProducts(productsData?.length || 0);
    setTrendingProducts(productsData || []);

    // Ventes mensuelles
    const { data: monthlyData, error: monthlyError } = await supabase
      .from('sales')
      .select('month,amount'); // exemple simple
    if (monthlyError) console.log('Erreur ventes mensuelles', monthlyError);
    setMonthlySales(monthlyData || []);

    setLoading(false);
  }

  const exportCSV = () => {
    const csvContent = [
      ['Produit', 'Montant'],
      ...(monthlySales.map((s) => [s.month || '', s.amount || 0]) || []),
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ventes.csv';
    link.click();
  };

  if (loading) return <p>Chargement...</p>;

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
              <li key={p.id}>
                {p.name} — ${p.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>📈 Ventes Mensuelles</h2>
        {monthlySales.length === 0 ? (
          <p>Aucune vente ce mois-ci.</p>
        ) : (
          <pre>{JSON.stringify(monthlySales, null, 2)}</pre>
        )}
      </div>

      <div>
        <button onClick={exportCSV}>📤 Exporter les données</button>
      </div>
    </div>
  );
}

export default App;
