import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🧾 Get all transactions
app.get("/transactions", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ➕ Add a new transaction
app.post("/transactions", (req, res) => {
  const { title, amount, category, type } = req.body;
  if (!title || !amount || !category || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO transactions (title, amount, category, type) VALUES (?, ?, ?, ?)";
  db.query(query, [title, amount, category, type], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: "Transaction added successfully",
      id: results.insertId,
    });
  });
});

// ❌ Delete a transaction by ID
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM transactions WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaction deleted successfully" });
  });
});

// 🚀 Start server AFTER all routes are defined
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
