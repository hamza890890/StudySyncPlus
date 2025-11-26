const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize DB connection
const db = require('./db');

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const quoteRoutes = require("./routes/quotes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/quote", quoteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Basic root check
app.get('/', (req, res) => {
  res.send('StudySync+ backend is running');
});

// Test DB connection route
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
