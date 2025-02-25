require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hangoutRoutes = require("./routes/hangoutRoutes");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hangouts", hangoutRoutes);

// Connect to Database
db();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
