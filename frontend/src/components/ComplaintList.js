import React, { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchData = async () => {
    const res = await API.get("/complaints");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data
    .filter(c => c.issue.toLowerCase().includes(search.toLowerCase()))
    .filter(c => filter === "All" || c.status === filter);

  return (
    <div className="card">
      <h2>Complaints</h2>

      <input
        placeholder="Search issue..."
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setFilter(e.target.value)}>
        <option>All</option>
        <option>Pending</option>
        <option>Resolved</option>
      </select>

      {filteredData.map(c => (
        <div className="card" key={c._id}>
          <h3>{c.issue}</h3>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>

          <button
            className="btn-success"
            onClick={() => {
              API.put(`/complaints/${c._id}`, { status: "Resolved" })
                .then(fetchData);
            }}
          >
            Resolve
          </button>

          <button
            className="btn-danger"
            onClick={() => {
              API.delete(`/complaints/${c._id}`)
                .then(fetchData);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;