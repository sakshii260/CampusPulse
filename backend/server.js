const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./backend/.env" });

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// API routes
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ================= FRONTEND =================

// Serve React build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ✅ SAFE fallback (NO "*" or "/*")
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/build", "index.html")
  );
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));