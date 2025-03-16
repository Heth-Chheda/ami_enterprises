import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ads = [
  {
    id: 1,
    text: "Up to 50% off on Office Supplies!",
    image:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1640&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "Exclusive deals on Art Supplies – Limited Time!",
    image:
      "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1640&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "New Arrivals – Explore the latest collection now!",
    image:
      "https://img.freepik.com/free-vector/new-arrival-simple-modern-banner_1017-15629.jpg",
  },
];

const AnimatedBanner = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-900 rounded-l shadow-lg h-100 relative my-1.5">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={ads[currentAd].id}
          className="absolute inset-0 bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url('${ads[currentAd].image}')`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
        </motion.div>
      </AnimatePresence>

      {/* Text Section */}
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={ads[currentAd].id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl font-semibold drop-shadow-lg px-4"
          >
            {ads[currentAd].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentAd ? "bg-white" : "bg-gray-400"
            }`}
            initial={{ scale: 0.8 }}
            animate={{
              scale: index === currentAd ? 1.2 : 0.8,
              backgroundColor: index === currentAd ? "#ffffff" : "#a0aec0",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBanner;
