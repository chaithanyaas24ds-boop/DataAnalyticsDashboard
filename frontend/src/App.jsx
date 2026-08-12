import CustomerChart from "./components/CustomerChart";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardCard from "./components/DashboardCard";
import SalesChart from "./components/SalesChart";

function App() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [categorySales, setCategorySales] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/total-sales")
      .then((response) => response.json())
      .then((data) => {
        setTotalSales(data.totalSales);
      })
      .catch((error) => {
        console.error("Error fetching total sales:", error);
      });

    fetch("http://localhost:5000/api/total-orders")
      .then((response) => response.json())
      .then((data) => {
        setTotalOrders(data.totalOrders);
      })
      .catch((error) => {
        console.error("Error fetching total orders:", error);
      });

    fetch("http://localhost:5000/api/total-customers")
      .then((response) => response.json())
      .then((data) => {
        setTotalCustomers(data.totalCustomers);
      })
      .catch((error) => {
        console.error("Error fetching total customers:", error);
      });

    fetch("http://localhost:5000/api/total-profit")
      .then((response) => response.json())
      .then((data) => {
        setTotalProfit(data.totalProfit);
      })
      .catch((error) => {
        console.error("Error fetching total profit:", error);
      });

    const categoryUrl =
      selectedCategory === "All"
        ? "http://localhost:5000/api/category-sales"
        : `http://localhost:5000/api/category-sales?category=${selectedCategory}`;

    fetch(categoryUrl)
      .then((response) => response.json())
      .then((data) => {
        setCategorySales(data);
    })
     .catch((error) => {
        console.error("Error fetching category sales:", error);
    });
  }, [selectedCategory]);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            padding: "30px",
            backgroundColor: "#f5f7fb",
            minHeight: "100vh",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              marginTop: "0",
              marginBottom: "5px",
              color: "black",
              fontSize: "32px",
            }}
          >
            Data Analytics Dashboard
          </h1>

          <p
            style={{
              marginTop: "0",
              marginBottom: "25px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            Sales and Customer Insights
          </p>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Filter by Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black",
              fontSize: "15px",
              cursor: "pointer",
              minWidth: "200px",
            }}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

          <div
            style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
            <DashboardCard
              title="Total Sales"
              value={`₹${totalSales.toLocaleString("en-IN")}`}
            />

            <DashboardCard
              title="Total Orders"
              value={totalOrders}
            />

            <DashboardCard
              title="Total Profit"
              value={`₹${totalProfit.toLocaleString("en-IN")}`}
            />

            <DashboardCard
              title="Customers"
              value={totalCustomers}
            />

            <SalesChart />
            <CustomerChart />
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                margin: "20px",
                borderRadius: "12px",
                minWidth: "400px",
              }}
            >
              <h2 style={{ color: "black" }}>Category Sales</h2>

              {categorySales.map((item) => (
                <div
                  key={item.category}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <span>{item.category}</span>

                  <span style={{ color: "black", fontWeight: "bold" }}>
                    ₹{Number(item.total_sales).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;