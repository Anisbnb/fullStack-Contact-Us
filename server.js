// Load environment variables from .env file
require("dotenv").config();

// Import required dependencies
const express = require("express");
const cors = require("cors");

// Import local modules
const connectDB = require("./utils/connectDB");
const authRoutes = require("./routes/auth");
const leadRoutes = require("./routes/leads");

const { createLead, updateLead } = require("./controllers/leadControllers");

// Initialize Express application
const app = express();

// Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use("/api/auth", authRoutes);

// CORS configuration for external access
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Trust proxy for external connections
app.set('trust proxy', true);

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/", leadRoutes);
app.use("/api/leads", createLead);
// Default route for API health check
app.use("/api/leads", updateLead);

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

// Start server function
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    console.log("Database connected successfully");
    
    // Start the server
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0'; // Bind to all interfaces
    
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
      console.log(`Local access: http://localhost:${PORT}/`);
      console.log(`External access: http://154.241.3.45:${PORT}/`);
      console.log(`API Health Check: http://154.241.3.45:${PORT}/api/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export the app for Vercel serverless functions
module.exports = app;
