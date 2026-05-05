import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function Features() {
  const data = [
    "Instant Reporting",
    "Live Tracking",
    "Fast Resolution"
  ];

  return (
    <div className="grid grid-cols-3 gap-6 px-20 mt-32">

      {data.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          <FaCheckCircle className="text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold">{item}</h3>
          <p className="text-gray-400 mt-2">
            Modern complaint management system
          </p>
        </motion.div>
      ))}

    </div>
  );
}