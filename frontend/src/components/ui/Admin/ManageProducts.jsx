import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Product A",
    category: "Electronics",
    color: "Red",
    price: 99.99,
    stock: 20,
    description: "High quality electronic device",
  },
  {
    id: 2,
    name: "Product B",
    category: "Clothing",
    color: "Blue",
    price: 49.99,
    stock: 15,
    description: "Comfortable and stylish",
  },
  {
    id: 3,
    name: "Product C",
    category: "Furniture",
    color: "White",
    price: 199.99,
    stock: 10,
    description: "Modern and durable",
  },
  {
    id: 4,
    name: "Product D",
    category: "Electronics",
    color: "Black",
    price: 79.99,
    stock: 25,
    description: "High performance device",
  },
  {
    id: 5,
    name: "Product E",
    category: "Clothing",
    color: "Green",
    price: 29.99,
    stock: 30,
    description: "Soft and eco-friendly",
  },
  // Add 15 more products with similar fields
];

const ManageProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    color: "",
  });

  const filteredProducts = products.filter((product) => {
    return (
      (filters.name === "" ||
        product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.category === "" || product.category === filters.category) &&
      (filters.color === "" || product.color === filters.color)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6">
      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
        <select
          name="color"
          value={filters.color}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Colors</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Green">Green</option>
        </select>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-violet-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Color</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-violet-50 transition duration-200 border-b"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.color}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {/* Update Button */}
                    <button
                      onClick={() => console.log(`Edit ${product.id}`)}
                      className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition duration-200"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
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

      {/* No products found message */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-6">No products found.</div>
      )}
    </div>
  );
};

export default ManageProducts;
