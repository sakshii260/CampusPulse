import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#ff4d4d", "#4caf50"];

function Dashboard({ complaints = [] }) {
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const data = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: resolved }
  ];

  return (
    <div className="card">
      <h3>Complaint Stats</h3>

      {complaints.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Dashboard;