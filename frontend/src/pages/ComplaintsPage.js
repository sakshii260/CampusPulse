import { useState } from "react";
import axios from "axios";

export default function ComplaintForm() {
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://campuspulse-3-c5ur.onrender.com/api/complaints",
        {
          name,
          issue,
          description,
          location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("SUCCESS:", res.data);
      alert("Complaint Submitted Successfully!");

      // 🔥 Clear form after submit
      setName("");
      setIssue("");
      setDescription("");
      setLocation("");

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      alert(
        "Error submitting complaint: " +
          (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-xl space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">
          Submit Complaint
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        {/* ISSUE */}
        <input
          type="text"
          placeholder="Issue Title"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
          rows="4"
        />

        {/* LOCATION */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Location</option>

          {/* Hostels */}
          <option value="Hostel A">Hostel A</option>
          <option value="Hostel B">Hostel B</option>
          <option value="Hostel C">Hostel C</option>
          <option value="Hostel D">Hostel D</option>
          <option value="Hostel E">Hostel E</option>
          <option value="Hostel F">Hostel F</option>
          <option value="Hostel G">Hostel G</option>
          <option value="Hostel H">Hostel H</option>
          <option value="Hostel I">Hostel I</option>
          <option value="Hostel J">Hostel J</option>
          <option value="Hostel K">Hostel K</option>
          <option value="Hostel L">Hostel L</option>
          <option value="Hostel M">Hostel M</option>
          <option value="Hostel N">Hostel N</option>
          <option value="Hostel O">Hostel O</option>
          <option value="Hostel PG">Hostel PG</option>
          <option value="Hostel Q">Hostel Q</option>

          {/* Campus */}
          <option value="G Block">G Block</option>
          <option value="F Block">F Block</option>
          <option value="H Block">H Block</option>
          <option value="E Block">E Block</option>
          <option value="B Block">B Block</option>
          <option value="C Block">C Block</option>
          <option value="D Block">D Block</option>
          <option value="CSED">CSED</option>
          <option value="Workshop">Workshop</option>
          <option value="Activity Space">Activity Space</option>
          <option value="Library">Library</option>
          <option value="LT Area">LT Area</option>
        </select>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}