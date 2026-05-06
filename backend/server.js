const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== DATABASE ==================
connectDB();

// ================== API ROUTES ==================
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ================== DEBUG ==================
console.log("Server reached before frontend setup");

// ================== SERVE FRONTEND ==================
const frontendPath = path.join(__dirname, "../frontend/build");

// ✅ serve static files (JS, CSS, images)
app.use(express.static(frontendPath));

// ✅ root route
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ FIXED fallback (VERY IMPORTANT)
app.get("*", (req, res) => {
  // only send index.html for React routes (NOT for JS/CSS)
  if (!req.path.includes(".")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  }
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});