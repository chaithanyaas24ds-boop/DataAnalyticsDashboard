const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "data_analytics",
  password: "chai",
  port: 5432
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL connected successfully!");
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Data Analytics Dashboard Backend is running!"
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database(), current_schema()"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sales", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sales ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch sales data"
    });
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch customers data"
    });
  }
});

app.get("/api/total-sales", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT COALESCE(SUM(quantity * price), 0) AS total_sales
      FROM sales
    `);

    res.json({
      totalSales: Number(result.rows[0].total_sales)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch total sales"
    });
  }
});

app.get("/api/total-orders", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS total_orders FROM sales"
    );

    res.json({
      totalOrders: Number(result.rows[0].total_orders)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch total orders"
    });
  }
});

app.get("/api/total-customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS total_customers FROM customers"
    );

    res.json({
      totalCustomers: Number(result.rows[0].total_customers)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch total customers"
    });
  }
});

app.get("/api/total-profit", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT COALESCE(SUM(quantity * price) * 0.20, 0) AS total_profit
      FROM sales
    `);

    res.json({
      totalProfit: Number(result.rows[0].total_profit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch total profit"
    });
  }
});

app.get("/api/category-sales", async (req, res) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT
        category,
        SUM(quantity * price) AS total_sales
      FROM sales
    `;

    const values = [];

    if (category && category !== "All") {
      query += ` WHERE category = $1`;
      values.push(category);
    }

    query += `
      GROUP BY category
      ORDER BY total_sales DESC
    `;

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch category sales"
    });
  }
});

app.get("/api/daily-sales", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sale_date,
        SUM(quantity * price) AS total_sales
      FROM sales
      GROUP BY sale_date
      ORDER BY sale_date
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch daily sales"
    });
  }
});

app.get("/api/customers-by-city", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        city,
        COUNT(*) AS customer_count
      FROM customers
      GROUP BY city
      ORDER BY customer_count DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch customers by city"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});