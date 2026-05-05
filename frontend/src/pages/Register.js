import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully ✅");
      navigate("/login");
    } else {
      alert(data.msg || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 p-8 rounded-xl w-[400px]"
      >
        <h2 className="text-2xl mb-4 font-bold">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/40"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/40"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/40"
        />

        <button className="w-full bg-blue-500 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;