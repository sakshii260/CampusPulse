import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="flex w-[900px] rounded-2xl overflow-hidden border border-white/10">

        {/* LEFT */}
        <div className="w-1/2 bg-white/5 flex items-center justify-center">
          <h2 className="text-2xl font-bold">CampusPulse</h2>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl mb-6">Welcome back</h2>

          <input
            placeholder="Email"
            className="w-full p-2 mb-4 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-white text-black py-2 rounded"
          >
            Sign in →
          </button>
        </div>

      </div>
    </div>
  );
}