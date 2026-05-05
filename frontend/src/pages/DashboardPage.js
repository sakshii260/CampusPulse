import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Pending", value: 5 },
  { name: "Resolved", value: 8 },
  { name: "In Progress", value: 3 }
];

export default function DashboardPage() {
  return (
    <div className="p-10 bg-black min-h-screen text-white">

      <h1 className="text-3xl mb-6">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl">Total: 16</div>
        <div className="bg-gray-900 p-6 rounded-xl">Resolved: 8</div>
        <div className="bg-gray-900 p-6 rounded-xl">Pending: 5</div>
      </div>

      {/* CHART */}
      <div className="bg-gray-900 p-6 rounded-xl h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}