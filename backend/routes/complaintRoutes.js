const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");


// ✅ GET ALL COMPLAINTS
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADD NEW COMPLAINT
router.post("/", async (req, res) => {
  try {
    const { name, issue, description, location } = req.body;

    const newComplaint = new Complaint({
      name,
      issue,
      description,
      location,
    });

    const saved = await newComplaint.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE STATUS (FOR ADMIN / FUTURE)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// STATUS STATS
router.get("/stats/status", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// HOSTEL / LOCATION STATS
router.get("/stats/location", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      {
        $group: {
          _id: "$location.block", // hostel A, B, C...
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;