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

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSortChange = (e) => setSortOption(e.target.value);

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

  // ✅ Sorting Logic
  if (sortOption === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAsc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "nameDesc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "discount") {
    filteredProducts.sort(
      (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* ✅ Filter Section */}
      <div className="w-full md:w-1/4 bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-xl rounded-xl p-6 border border-gray-300">
        <FilterBar filters={filters} setFilters={handleFilterChange} />
      </div>

      {/* ✅ Product Section */}
      <div className="w-full my-5 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* ✅ Search and Sorting Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
            <option value="discount">Discount %</option>
          </select>
        </div>

        {/* ✅ Product Count */}
        <p className="text-gray-500 mb-2">
          Showing {filteredProducts.length} products
        </p>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductDetail key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
