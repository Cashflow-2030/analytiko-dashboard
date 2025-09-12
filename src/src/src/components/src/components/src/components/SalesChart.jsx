import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesChart({ sales }) {
  const productMap = {};
  sales.forEach((s) => {
    productMap[s.product_id] = (productMap[s.product_id] || 0) + (s.quantity || 0);
  });

  const labels = Object.keys(productMap);
  const data = {
    labels,
    datasets: [
      {
        label: "Quantité vendue",
        data: Object.values(productMap),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  return (
    <div>
      <h2>📊 Sales Chart</h2>
      <Bar data={data} />
    </div>
  );
}
