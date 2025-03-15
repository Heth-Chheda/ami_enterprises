import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400">
            We provide high-quality products for all your office and art supply
            needs. Shop with confidence and explore our wide range of products!
          </p>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/contact"
                className="text-gray-400 hover:text-white transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="text-gray-400 hover:text-white transition"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/shipping"
                className="text-gray-400 hover:text-white transition"
              >
                Shipping & Returns
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/products"
                className="text-gray-400 hover:text-white transition"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="text-gray-400 hover:text-white transition"
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-gray-400 hover:text-white transition"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-400 hover:text-white transition text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-400 hover:text-white transition text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-400 hover:text-white transition text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Ami Enterprises. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
