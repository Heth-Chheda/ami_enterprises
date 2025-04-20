import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Home, MapPin, Phone, Star } from "lucide-react";

const Addresses = () => {
  const { user } = useSelector((state) => state.authentication);

  if (!user || !user.addresses || user.addresses.length === 0) {
    return (
      <div className="text-gray-500 text-center py-20 text-lg animate-pulse">
        No saved addresses found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <motion.h2
        className="text-3xl font-bold text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Saved Addresses
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {user.addresses.map((address, index) => (
          <motion.div
            key={index}
            className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Home size={18} className="text-violet-600" />
                {`Address #${index + 1}`}
              </p>
              {address.isDefault && (
                <span className="text-xs text-green-600 font-bold uppercase flex items-center gap-1">
                  <Star size={14} className="text-green-600" />
                  Default
                </span>
              )}
            </div>

            <div className="space-y-1 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-violet-500" />
                {address.ApartmentNumber}, {address.Street}, {address.Area}
              </p>
              <p className="ml-6">{`${address.City}, ${address.State} - ${address.PinCode}`}</p>
              <p className="ml-6">India</p>

              <p className="flex items-center gap-2 pt-2">
                <Phone size={16} className="text-violet-500" />
                {user.mobileNumber}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
