import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full h-[400px] bg-cover bg-center relative rounded-l shadow-xl overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1612599316791-451087c7fe15?q=80&w=1424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Heading Animation */}
        <motion.h1
          className="text-5xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Ami Enterprises
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          className="mt-4 text-lg font-light max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Find the best products at unbeatable prices!
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md font-semibold hover:bg-blue-600 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          onClick={() => navigate("/products")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
