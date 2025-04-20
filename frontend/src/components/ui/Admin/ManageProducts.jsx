import { getAllProducts } from "@/store/slices/productSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#00c49f",
  "#ff6f91",
  "#6a5acd",
  "#ffa07a",
  "#8dd1e1",
  "#a4de6c",
];

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dashboard/product/edit/${id}`);
  };

  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Chart data for products per category
  const categoryCounts = {};
  products?.forEach((product) => {
    product.categories.forEach((category) => {
      categoryCounts[category.name] = (categoryCounts[category.name] || 0) + 1;
    });
  });

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">No products found.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-violet-500 text-white">
              <th className="p-3 text-left text-sm sm:text-base">Name</th>
              <th className="p-3 text-left text-sm sm:text-base">Categories</th>
              <th className="p-3 text-left text-sm sm:text-base">Variants</th>
              <th className="p-3 text-left text-sm sm:text-base">Price</th>
              <th className="p-3 text-left text-sm sm:text-base">Stock</th>
              <th className="p-3 text-left text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-violet-50 transition duration-200 border-b"
              >
                <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                  {product.name}
                </td>

                <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((category) => (
                      <span
                        key={category._id}
                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-3 text-sm sm:text-base">
                  {product.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 mb-1 flex-wrap"
                    >
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{
                          backgroundColor: variant.color.hexCode,
                          borderColor:
                            variant.color.hexCode === "#FFFFFF"
                              ? "#ccc"
                              : variant.color.hexCode,
                        }}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-700">
                        {variant.color.name} - {variant.size} (
                        {variant.stockQuantity} in stock)
                      </span>
                    </div>
                  ))}
                </td>

                <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                  ₹{product.price.toFixed(2)}
                </td>

                <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                  {product.stockQuantity}
                </td>

                <td className="p-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleEdit(product._id);
                      }}
                      className="bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-600 transition duration-200 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => console.log(`Delete ${product._id}`)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Product Distribution by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-medium mb-3">Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-medium mb-3">Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
