import Navbar from "../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Evidence() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    // later connect to backend
    alert("File uploaded (demo)");
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen px-10 py-16">

        {/* PAGE TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Upload <span className="text-blue-400">Evidence</span>
        </motion.h1>

        {/* UPLOAD CARD */}
        <div className="max-w-3xl mx-auto glow-card p-8 rounded-2xl">

          <h2 className="text-xl mb-4 font-semibold">
            Upload Photo / Video Proof
          </h2>

          <p className="text-gray-400 mb-6">
            Attach images or videos to support your complaint. This helps admins resolve issues faster.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-white/10 border border-white/20 p-3 rounded-xl w-full text-sm"
            />

            <button
              onClick={handleUpload}
              className="bg-white text-black px-6 py-3 rounded-xl glow-btn hover:scale-105 transition"
            >
              Upload
            </button>
          </div>

          {file && (
            <p className="mt-4 text-green-400 text-sm">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* SAMPLE IMAGES SECTION */}
        <div className="mt-16">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Sample <span className="text-blue-400">Resolved Issues</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
                title: "Broken Fan Fixed"
              },
              {
                img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
                title: "Water Leakage Resolved"
              },
              {
                img: "https://images.unsplash.com/photo-1581093588401-22d5c9f4b4b7",
                title: "Light Issue Fixed"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glow-card rounded-xl overflow-hidden"
              >
                <img
                  src={item.img}
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold">{item.title}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-16 text-center text-gray-400 max-w-2xl mx-auto">
          <p>
            Uploading clear evidence helps in faster resolution of complaints.
            Make sure the image/video clearly shows the issue.
          </p>
        </div>

      </div>
    </div>
  );
}