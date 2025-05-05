import React from "react";
import { motion } from "framer-motion";

const HistoryCard = ({ year, description, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
      }}
      className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/70 p-6 rounded-2xl backdrop-blur-md border border-indigo-700/30 transition-all"
    >
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">{year}</h3>
      <p className="text-lg text-indigo-100">{description}</p>
    </motion.div>
  );
  export default HistoryCard;