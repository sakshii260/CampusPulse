const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },

  // 🔥 NEW FIELD (IMPORTANT)
  location: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);