console.log("📦 Running server.js from folder:", __dirname);
console.log("📦 PORT env:", process.env.PORT);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize DB connection
const db = require("./db");

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const quoteRoutes = require("./routes/quotes");

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://study-sync-plus.vercel.app", // your frontend domain
  "http://localhost:5173"               // for local development
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
// Optional: explicitly handle preflight
app.options("*", cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/quote", quoteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("StudySync+ backend is running");
});

// DB test route
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
