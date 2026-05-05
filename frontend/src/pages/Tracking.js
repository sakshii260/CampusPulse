import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Tracking() {
  const [complaints, setComplaints] = useState([]);

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
          Live <span className="text-blue-400">Tracking</span>
        </motion.h1>

        {complaints.length === 0 ? (
          <p className="text-center text-gray-400">
            No complaints found 🚫
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {complaints.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="glow-card p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold">{c.issue}</h3>

                <p className="text-gray-400 mt-2">
                  {c.description}
                </p>

                {/* STATUS PROGRESS */}
                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">
                    <span>Submitted</span>
                    <span>Resolved</span>
                  </div>

                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${
                        c.status === "Pending"
                          ? "w-1/3 bg-yellow-400"
                          : c.status === "In Progress"
                          ? "w-2/3 bg-blue-400"
                          : "w-full bg-green-400"
                      }`}
                    ></div>
                  </div>

                </div>

                <div className="mt-4 text-right">
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
        )}
      </div>
    </div>
  );
}