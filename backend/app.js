const express = require("express");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const db = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Protected Route Example
app.use("/api/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

// Start Server and DB
const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
