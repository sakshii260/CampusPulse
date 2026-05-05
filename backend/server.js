const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./backend/.env" });

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// API routes
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React routing fix
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../frontend/build/index.html")
  );
});

const PORT = process.env.PORT || 5000;
const path = require("path");

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route (VERY IMPORTANT)
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build", "index.html")
  );
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));