import ProductDetail from "@/components/ui/ProductDetail";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { getAllProducts } from "@/store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FilterBar from "@/components/ui/Product/Filter";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    company: [],
    color: [],
    category: [],
    priceRange: [0, 1000],
    ratings: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

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

    return (
      matchesCompany &&
      matchesColor &&
      matchesPrice &&
      matchesRatings &&
      matchesSearchTerm
    );
  });

  // Sorting Logic
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
    <div className="flex flex-col md:flex-row gap-4">
      {/* Filter Section */}
      <div className="w-full md:w-1/4 bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-xl rounded-xl p-6 border border-gray-300">
        <FilterBar filters={filters} setFilters={handleFilterChange} />
      </div>

      {/* Product Section */}
      <div className="w-full my-5 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Search and Sorting Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors"
            />
          </div>

          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-gray-100 hover:bg-gray-200"
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </div>

        {/* Product Grid */}
        {status === "loading" ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full"></div>
          </div>
        ) : status === "failed" ? (
          toast.error("Failed to load the products")
        ) : filteredProducts.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // ✅ Prevent cards from becoming too thin
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
                style={{
                  minWidth: "200px", // ✅ Set a minimum width to prevent shrinking
                }}
              >
                <ProductDetail product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
