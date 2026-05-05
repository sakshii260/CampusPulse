import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[80%]">

      <div className="flex items-center justify-between px-6 py-3 
      rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-400">
          CampusPulse
        </h1>

        {/* Links */}
        <div className="flex gap-8 text-gray-300">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#about">Who We Are</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/login" className="px-4 py-1 border rounded-lg">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-black px-4 py-1 rounded-lg"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}