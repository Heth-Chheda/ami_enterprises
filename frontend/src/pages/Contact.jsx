import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-violet-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        {/* ✅ Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ✅ Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-violet-500" />
                <span className="text-gray-600">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-violet-500" />
                <span className="text-gray-600">support@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-violet-500" />
                <span className="text-gray-600">
                  123 Main Street, Mumbai, India
                </span>
              </div>
            </div>
          </div>

          {/* ✅ Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 
                  rounded-lg shadow-sm focus:outline-none focus:ring-violet-500 
                  focus:border-violet-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 
                  rounded-lg shadow-sm focus:outline-none focus:ring-violet-500 
                  focus:border-violet-500"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 
                  rounded-lg shadow-sm focus:outline-none focus:ring-violet-500 
                  focus:border-violet-500"
                placeholder="Write your message here..."
                required
              />
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 
                text-white font-medium py-2 px-4 rounded-lg shadow-md 
                transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
