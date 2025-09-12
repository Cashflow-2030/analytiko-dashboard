export default function TrendingProducts({ products, sales }) {
  // Calcul simple du top produits par ventes
  const productSales = products.map((p) => {
    const totalSales = sales
      .filter((s) => s.product_id === p.id)
      .reduce((acc, curr) => acc + (curr.quantity || 0), 0);
    return { ...p, totalSales };
  });

  const trending = productSales.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

  return (
    <div>
      <h2>🔥 Trending Products</h2>
      <ul>
        {trending.map((p) => (
          <li key={p.id}>
            <strong>{p.name || p.title}</strong> – {p.totalSales} ventes
          </li>
        ))}
      </ul>
    </div>
  );
}
