import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 💾 Temporary in-memory data storage
let transactions = [];

// 🧠 Test route
app.get("/", (req, res) => {
  res.send("✅ FinTrack backend is running!");
});

// 🧾 Get all transactions
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// ➕ Add a new transaction
app.post("/transactions", (req, res) => {
  const { title, amount, category, type } = req.body;
  if (!title || !amount || !category || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newTransaction = {
    id: Date.now(),
    title,
    amount: parseFloat(amount),
    category,
    type,
  };

  transactions.push(newTransaction);
  res.json({ message: "Transaction added successfully", transaction: newTransaction });
});

// ❌ Delete a transaction by ID
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Transaction deleted successfully" });
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 FinTrack backend running on port ${PORT}`));
