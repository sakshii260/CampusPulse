import React, { useEffect, useState } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

  // 🔥 FETCH FROM LIVE BACKEND (NO LOCALHOST)
  const fetchComplaints = async () => {
    try {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔥 UPDATE STATUS
  const markResolved = async (id) => {
    try {
      await fetch(`/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Resolved" }), // 🔥 IMPORTANT
      });

      fetchComplaints();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  const filtered =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6 font-bold">Complaints</h1>

      {/* FILTER BUTTONS */}
      <div className="mb-6 space-x-3">
        {["All", "Pending", "In Progress", "Resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      {filtered.map((c) => (
        <div
          key={c._id}
          className="bg-white/10 p-5 rounded-xl mb-4 flex justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold">{c.issue}</h2>
            <p>{c.description}</p>

            <span
              className={`px-2 py-1 text-sm rounded ${
                c.status === "Resolved"
                  ? "bg-green-500"
                  : c.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {c.status}
            </span>
          </div>

          {c.status !== "Resolved" && (
            <button
              onClick={() => markResolved(c._id)}
              className="bg-green-600 px-3 py-1 rounded"
            >
              Resolve
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Complaints;