import FilterBar from "@/components/ui/Product/Filter";
// import ProductCard from "@/components/ui/Product/ProductDisplay";
import ProductDetail from "@/components/ui/ProductDetail";
// import { products } from "@/data/products";
import React, { useState, useEffect } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { getAllProducts } from "@/store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    company: [],
    color: [],
    category: [],
    priceRange: [0, 1000],
    ratings: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  // Handle window resize for responsive filter behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(false); // Close dropdown on desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter logic
  let filteredProducts = products.filter((product) => {
    const matchesCompany =
      filters.company.length === 0 || filters.company.includes(product.company);
    const matchesColor =
      filters.color.length === 0 || filters.color.includes(product.color);
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchesRatings =
      filters.ratings.length === 0 ||
      filters.ratings.includes(product.ratings?.average);
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (status === "loading") {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full"></div>
        </div>
      );
    }

    if (status === "failed") {
      toast.error("Failed to Load the products");
    }

    return (
      matchesCompany &&
      matchesColor &&
      matchesPrice &&
      matchesRatings &&
      matchesSearchTerm
    );
  });

  // Sorting logic
  if (sortOption === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAsc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "nameDesc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="flex">
      {/* Filter Section */}
      {isMobile ? (
        <>
          {/* Filter Button (Mobile Only) */}
          <button
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={20} />
            Filter
          </button>

          {/* Filter Dropdown (Mobile Only) */}
          {showFilters && (
            <div className="absolute z-20 top-14 left-0 w-full bg-white shadow-md rounded-lg p-4 border border-gray-200 transition-transform duration-300">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowFilters(false)}
              >
                <IoClose size={20} />
              </button>
              <FilterBar filters={filters} setFilters={handleFilterChange} />
            </div>
          )}
        </>
      ) : (
        // Fixed Filter Bar (Desktop)
        <div className="w-1/4 p-4">
          <FilterBar filters={filters} setFilters={handleFilterChange} />
        </div>
      )}

      {/* Product Section */}
      <div className="w-full md:w-3/4 p-2 md:p-4">
        {/* Search and Sorting Section */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          {/* Search Bar with Icon */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
              onClick={() => console.log(`Searching for: ${searchTerm}`)}
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductDetail key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
