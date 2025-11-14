// Load environment variables from .env file
require("dotenv").config();

// Import required dependencies
const express = require("express");
const cors = require("cors");

// Import local modules
const connectDB = require("./utils/connectDB");
const authRoutes = require("./routes/auth");
const leadRoutes = require("./routes/leads");

// Initialize Express application
const app = express();

// Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/", leadRoutes);

// Default route for API health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Rental Store API is running",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Database connection and app export for Vercel
connectDB().then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.error("Failed to connect to database:", error);
});

// Export the app for Vercel serverless functions
module.exports = app;
