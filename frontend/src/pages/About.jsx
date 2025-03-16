import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About Us
        </motion.h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/004/878/598/non_2x/colorful-ae-a-e-letter-logo-design-with-a-creative-cut-and-gradient-blue-rounded-background-vector.jpg" // Add your image path here
            alt="About"
            className="w-full h-96 object-cover rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-semibold text-purple-700 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At **Ami Enterprises**, we take pride in providing high-quality
              products and excellent customer service. Our journey began with a
              passion for delivering the best shopping experience. We aim to
              offer top-notch products and ensure customer satisfaction.
            </p>

            <h3 className="text-2xl font-medium text-purple-600 mt-6 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make online shopping easy, convenient, and
              affordable for everyone. We are committed to bringing you the best
              products at competitive prices.
            </p>

            <h3 className="text-2xl font-medium text-purple-600 mt-6 mb-2">
              Why Choose Us
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>High-quality products sourced from trusted suppliers</li>
              <li>Fast and reliable shipping</li>
              <li>24/7 customer support</li>
              <li>Secure and hassle-free shopping experience</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-t from-purple-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member Card */}
            {[
              {
                name: "Heth Chheda",
                role: "Founder & CEO",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3xhYxHyPBmzA60C5bW26Vrk5qeLkJmFjzQ&s",
              },
              {
                name: "Jane Doe",
                role: "Marketing Head",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPHli5ImDyqz8ppgxUKMemo08GSanpCP6mA&s",
              },
              {
                name: "Kane Smith",
                role: "Product Manager",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIV99IJOGUBMQBy9kccOQsAyq36yzt0BRYUw&s",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-84 object-fill"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-purple-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
