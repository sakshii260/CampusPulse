import React, { useState } from "react";

const ComplaintForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    issue: "",
    description: "",
    priority: "Low",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.name || !formData.issue || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Complaint submitted successfully ✅");

        // reset form
        setFormData({
          name: "",
          issue: "",
          description: "",
          priority: "Low",
        });

        // refresh complaints list
        if (onSuccess) onSuccess();
      } else {
        alert(data.msg || "Error submitting complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Submit Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Issue */}
        <input
          type="text"
          name="issue"
          placeholder="Issue Title"
          value={formData.issue}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Describe your issue..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Priority */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-500 focus:outline-none"
        >
          <option className="text-black">Low</option>
          <option className="text-black">Medium</option>
          <option className="text-black">High</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;