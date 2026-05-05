import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        {/* Badge */}
        <div className="mb-6 px-5 py-2 rounded-full bg-white/10 text-sm backdrop-blur-md border border-white/10">
          Real-time Complaint Tracking System →
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold leading-tight tracking-tight"
        >
          Smart Campus <br />
          Complaint <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 text-transparent bg-clip-text">
            Management System
          </span>
        </motion.h1>

        {/* Description */}
        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          A centralized digital platform to report, track, and resolve campus issues.
          Upload photo & video evidence, get real-time updates, and more.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Started Now
          </button>

          <button className="text-gray-400 hover:text-white transition">
            Learn More
          </button>
        </div>

      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-10">
        <h2 className="text-center text-blue-400 mb-10 text-xl">
          WHY USE CAMPUSPULSE?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Instant Digital Reporting",
              desc: "Submit complaints instantly through web portal",
              route: "/reporting"
            },
            {
              title: "Photo & Video Evidence",
              desc: "Upload proof to support your complaint",
              route: "/evidence"
            },
            {
              title: "Live Status Tracking",
              desc: "Track status from Pending to Resolved",
              route: "/tracking"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="glow-card p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>

              <button
                onClick={() => navigate(item.route)}
                className="mt-4 bg-white text-black px-4 py-2 rounded-xl glow-btn"
              >
                Explore →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-10">
        <h2 className="text-center text-blue-400 mb-10 text-xl">
          HOW IT WORKS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Register & Login", route: "/register" },
            { title: "Submit Complaint", route: "/complaint" },
            { title: "Track & Resolve", route: "/dashboard" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-xl text-center hover:scale-105 border border-white/10"
            >
              <h3 className="text-xl">{item.title}</h3>

              <button
                onClick={() => navigate(item.route)}
                className="mt-4 text-blue-400"
              >
                Go →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section id="contact" className="py-20 text-center">
        <h2 className="text-blue-400 mb-6">CONNECT WITH US</h2>

        <div className="flex justify-center gap-10">
          <div>Instagram</div>
          <div>GitHub</div>
          <div>Email</div>
        </div>
      </section>

    </div>
  );
}