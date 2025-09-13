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
      .select('amount, created_at');
    if (salesError) console.log('Erreur ventes', salesError);
    setTotalSales(salesData?.reduce((sum, s) => sum + Number(s.amount), 0) || 0);

    // Clients Actifs
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('id');
    if (clientsError) console.log('Erreur clients', clientsError);
    setActiveClients(clientsData?.length || 0);

    // Produits
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id,title,handle,price,popularity')
      .order('popularity', { ascending: false })
      .limit(5);
    if (productsError) console.log('Erreur produits', productsError);
    setTotalProducts(productsData?.length || 0);
    setTrendingProducts(productsData || []);

    // Ventes Mensuelles
    // Exemple simple : regrouper par mois depuis la table sales
    const monthlyMap = {};
    salesData?.forEach(s => {
      const month = new Date(s.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
      monthlyMap[month] = (monthlyMap[month] || 0) + Number(s.amount);
    });
    const monthlyArray = Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount }));
    setMonthlySales(monthlyArray);

    setLoading(false);
  }

  const exportCSV = () => {
    const csvContent = [
      ['Produit', 'Prix', 'Popularité'],
      ...(trendingProducts.map(p => [p.title, p.price, p.popularity]) || []),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'produits.csv';
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
            {trendingProducts.map(p => (
              <li key={p.id}>
                {p.title} — ${p.price} — Popularité: {p.popularity}
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
          <ul>
            {monthlySales.map((m, idx) => (
              <li key={idx}>
                {m.month} : ${m.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button onClick={exportCSV}>📤 Exporter les produits</button>
      </div>
    </div>
  );
}

export default App;
