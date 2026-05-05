import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center mt-28 px-6">

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold leading-tight"
      >
        Smart Campus <br />
        <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-transparent bg-clip-text">
          Complaint System
        </span>
      </motion.h1>

      <p className="text-gray-400 mt-6 max-w-xl mx-auto">
        Report, track and resolve campus issues in real-time with modern UX.
      </p>

      <button className="mt-8 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition">
        Get Started
      </button>
    </div>
  );
}