import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesChart() {
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    fetch("https://data-analytics-backend-0s3q.onrender.com/api/daily-sales")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          date: new Date(item.sale_date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
          sales: Number(item.total_sales),
        }));

        setDailySales(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching daily sales:", error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        margin: "20px",
        borderRadius: "12px",
        width: "600px",
        height: "400px",
      }}
    >
      <h2 style={{ color: "black" }}>Sales Over Time</h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={dailySales}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;