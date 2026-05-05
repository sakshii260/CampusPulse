import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Reporting() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  const count = (status) =>
    complaints.filter((c) => c.status === status).length;

  return (
    <div>
      <Navbar />

      <div className="min-h-screen px-10 py-16">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Complaint <span className="text-blue-400">Reporting</span>
        </motion.h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Pending", value: count("Pending") },
            { title: "In Progress", value: count("In Progress") },
            { title: "Resolved", value: count("Resolved") }
          ].map((item, i) => (
            <div key={i} className="glow-card p-6 rounded-xl text-center">
              <p className="text-gray-400">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className="flex gap-4 mb-10 justify-center">
          {["All", "Pending", "In Progress", "Resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl ${
                filter === f
                  ? "bg-white text-black"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="glow-card p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold">{c.issue}</h3>
              <p className="text-gray-400 mt-2">{c.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">{c.name}</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    c.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : c.status === "In Progress"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}