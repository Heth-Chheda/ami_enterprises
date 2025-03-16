import React from "react";
import { Truck, ShieldCheck, Headphones } from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Truck size={40} className="text-gray-700" />,
    title: "Standard Shipping Worldwide",
    description: "Get fast and reliable delivery worldwide.",
  },
  {
    id: 2,
    icon: <ShieldCheck size={40} className="text-gray-700" />,
    title: "100% Safe & Secure Checkout",
    description: "Your transactions are protected with top-level encryption.",
  },
  {
    id: 3,
    icon: <Headphones size={40} className="text-gray-700" />,
    title: "24/7 Online Support",
    description: "We're here to help you anytime, day or night.",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-12 px-4 mb-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
