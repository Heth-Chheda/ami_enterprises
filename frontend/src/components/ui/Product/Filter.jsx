import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterBar = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Handle change functions
  const handleCompanyChange = (company) => {
    setFilters({
      ...filters,
      company: filters.company.includes(company)
        ? filters.company.filter((c) => c !== company)
        : [...filters.company, company],
    });
  };

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category],
    });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      ratings: filters.ratings.includes(rating)
        ? filters.ratings.filter((r) => r !== rating)
        : [...filters.ratings, rating],
    });
  };

  const handlePriceChange = (value) => {
    setFilters({
      ...filters,
      priceRange: [value, filters.priceRange[1]],
    });
  };

  const clearFilters = () => {
    setFilters({
      company: [],
      color: [],
      category: [],
      priceRange: [0, 1000],
      ratings: [],
    });
  };
  // ✅ Set isOpen based on screen size in useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true); // ✅ Open filters on larger screens
      } else {
        setIsOpen(false); // ✅ Close filters on smaller screens
      }
    };

    handleResize(); // ✅ Set initial state on component mount

    window.addEventListener("resize", handleResize); // ✅ Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // ✅ Clean up event listener
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full md:w-full">
      {/* Toggle Button for Mobile */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-violet-500 focus:outline-none md:hidden" // Hide on larger screens
        >
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
      </div>

      {isOpen && (
        <>
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              Price Range
            </h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(+e.target.value)}
              className="w-full accent-violet-500"
            />
            <div className="text-sm text-gray-500 mt-2">
              ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </div>
          </div>

          {/* Company Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Company</h3>
            <div className="flex flex-col gap-2">
              {[
                "Classmate",
                "Camlin",
                "Faber-Castell",
                "Reynolds",
                "3M",
                "Post-it",
              ].map((company) => (
                <label key={company} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.company.includes(company)}
                    onChange={() => handleCompanyChange(company)}
                    className="w-4 h-4 text-violet-500 border-gray-300 rounded focus:ring-violet-500"
                  />
                  <span className="text-gray-700">{company}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Category</h3>
            <div className="flex flex-col gap-2">
              {["Stationery", "Office Supplies", "Art", "School"].map(
                (category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-violet-500 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Ratings</h3>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-violet-500 border-gray-300 rounded focus:ring-violet-500"
                  />
                  <span className="text-gray-700">{rating} ★ & up</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={clearFilters}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 rounded-lg transition"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default FilterBar;
