const express = require("express");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const employeeRoutes = require("./routes/employeeRoutes");
const db = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", employeeRoutes);

app.use("/", (req, res) => {
  res.json({ message: "App is running!" });
});

// Start Server and DB
const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});