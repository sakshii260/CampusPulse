import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data._id) {
        // ✅ Save user
        localStorage.setItem("userId", data._id);
        localStorage.setItem("user", JSON.stringify(data));

        alert("Login successful ✅");

        navigate("/dashboard");
      } else {
        alert(data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-[900px] max-w-full grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10">

        {/* LEFT SIDE (VISUAL) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8">
          <h2 className="text-3xl font-bold mb-4">CampusPulse</h2>
          <p className="text-gray-300 text-center">
            Manage campus complaints efficiently with real-time tracking.
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-6">Login to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-sm text-gray-400 mt-4 text-center">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;