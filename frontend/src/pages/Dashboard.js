import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [statusData, setStatusData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const statusRes = await axios.get(
        "http://localhost:5000/api/complaints/stats/status"
      );

      const locationRes = await axios.get(
        "http://localhost:5000/api/complaints/stats/location"
      );

      // format data
      setStatusData(
        statusRes.data.map((item) => ({
          name: item._id,
          value: item.count
        }))
      );

      setLocationData(
        locationRes.data.map((item) => ({
          name: item._id || "Unknown",
          value: item.count
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div>
      <Navbar />

      <div className="min-h-screen px-10 py-16">

        <h1 className="text-4xl font-bold text-center mb-12">
          Dashboard <span className="text-blue-400">Analytics</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* STATUS PIE CHART */}
          <div className="glow-card p-6 rounded-xl">
            <h2 className="text-xl mb-4">Complaint Status</h2>

            <PieChart width={300} height={300}>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* LOCATION BAR CHART */}
          <div className="glow-card p-6 rounded-xl">
            <h2 className="text-xl mb-4">Complaints by Location</h2>

            <BarChart width={400} height={300} data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>

        </div>
      </div>
    </div>
  );
}