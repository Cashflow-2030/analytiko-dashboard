import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let { data, error } = await supabase
        .from("products")
        .select("id, name, price")
        .limit(5);

      if (error) console.error(error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-3">🔥 Produits Tendances</h2>
      <ul>
        {products.length > 0 ? (
          products.map((p) => (
            <li key={p.id} className="flex justify-between py-2 border-b">
              <span>{p.name}</span>
              <span className="text-gray-600">${p.price}</span>
            </li>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </ul>
    </div>
  );
}
