import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      const { data, error } = await supabase
        .from('products')
        .select('title, stock, sold')
        .gt('sold', 50);
      if (error) console.log(error);
      else setAlerts(data);
    }
    fetchAlerts();
  }, []);

  return (
    <div>
      <h2>Alerts Produits qui explosent</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((item) => (
            <li key={item.title}>
              {item.title} - Ventes: {item.sold}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune alerte pour le moment.</p>
      )}
    </div>
  );
}
