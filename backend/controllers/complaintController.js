const Complaint = require("../models/Complaint");

// CREATE
exports.createComplaint = async (req, res) => {
  const data = await Complaint.create(req.body);
  res.json(data);
};

// GET ALL
exports.getComplaints = async (req, res) => {
  const data = await Complaint.find().sort({ createdAt: -1 });
  res.json(data);
};

// UPDATE
exports.updateComplaint = async (req, res) => {
  const data = await Complaint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
};

// DELETE
exports.deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};