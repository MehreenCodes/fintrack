import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://fintrack-dev.vercel.app"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

let transactions = [];

app.get("/", (req, res) => res.send("✅ FinTrack backend is running!"));

app.get("/transactions", (req, res) => res.json(transactions));

app.post("/transactions", (req, res) => {
  const { title, amount, category, type } = req.body;
  if (!title || !amount || !category || !type)
    return res.status(400).json({ error: "All fields are required" });

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

app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Transaction deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 FinTrack backend running on port ${PORT}`));
