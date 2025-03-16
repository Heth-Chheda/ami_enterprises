import React, { useEffect, useState } from "react";
import FeaturedProducts from "@/components/ui/Home/FeaturedProducts";
import Categories from "@/components/ui/Home/Categories";
import ServicesSection from "@/components/ui/Home/ServiceSection";
import HeroSection from "@/components/ui/Home/HeroSection";
import AnimatedBanner from "@/components/ui/Home/AnimatedBanner";

const ads = [
  "Get 20% off on your first order!",
  "Free shipping on orders over $50!",
  "New arrivals now available – Shop Now!",
];

const Home = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center ">
      {/* Hero Section */}
      <HeroSection />

      {/* Animated Banner Section */}
      <AnimatedBanner />

      {/* Categories Section */}
      <section className="w-full max-w-7xl mx-auto mt-8 px-4">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
          Shop by Categories
        </h2>
        <Categories />
      </section>

      {/* Featured Products Section */}
      <section className="w-full max-w-7xl mx-auto mt-8 px-4">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700 text-center">
          Featured Products
        </h2>
        <FeaturedProducts />
      </section>
      {/* ✅ Services Section */}
      <ServicesSection />
    </div>
  );
};

export default Home;
