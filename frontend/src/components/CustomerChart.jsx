import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomerChart() {
  const [customersByCity, setCustomersByCity] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers-by-city")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          city: item.city,
          customers: Number(item.customer_count),
        }));

        setCustomersByCity(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching customers by city:", error);
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
      <h2 style={{ color: "black" }}>Customers by City</h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={customersByCity}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="city" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey="customers" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerChart;