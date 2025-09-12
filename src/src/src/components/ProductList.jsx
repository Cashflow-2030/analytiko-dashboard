export default function ProductList({ products }) {
  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name || p.title}</strong> – {p.price || "N/A"}$
          </li>
        ))}
      </ul>
    </div>
  );
}
