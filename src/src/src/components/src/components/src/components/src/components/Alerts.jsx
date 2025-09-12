export default function Alerts({ products, sales }) {
  // Produits “explosifs” : +10 ventes en 24h par exemple
  const alerts = products.filter((p) => {
    const total = sales
      .filter((s) => s.product_id === p.id)
      .reduce((acc, curr) => acc + (curr.quantity || 0), 0);
    return total >= 10;
  });

  if (!alerts.length) return null;

  return (
    <div>
      <h2>🚨 Product Alerts</h2>
      <ul>
        {alerts.map((p) => (
          <li key={p.id}>
            <strong>{p.name || p.title}</strong> – {sales.filter(s => s.product_id===p.id).reduce((a,b)=>a+(b.quantity||0),0)} ventes !
          </li>
        ))}
      </ul>
    </div>
  );
}
