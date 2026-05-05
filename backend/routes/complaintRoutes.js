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
    console.log("BODY:", req.body); // 👈 ADD THIS LINE

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
    console.log("ERROR:", err.message); // 👈 ADD THIS
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


module.exports = router;