import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/complaints")
      .then(res => {
        setStats({
          total: res.data.length,
          resolved: res.data.filter(c => c.status === "Resolved").length
        });
      });
  }, []);

  return (
    <div className="p-10 text-white bg-[#020617] min-h-screen">
      <h1 className="text-3xl mb-10">Admin Panel</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl">
          Total Complaints: {stats.total}
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          Resolved: {stats.resolved}
        </div>
      </div>
    </div>
  );
}