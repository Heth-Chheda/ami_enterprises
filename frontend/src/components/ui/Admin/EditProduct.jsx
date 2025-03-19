import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProductById } from "@/store/slices/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, status, error } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    stockQuantity: "",
    categories: [],
    variants: [],
    company: "",
    stockKeepingUnit: "",
    isFeatured: false,
    isActive: true,
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Fetch product data
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  // Populate form data
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        mrp: selectedProduct.mrp || "",
        stockQuantity: selectedProduct.stockQuantity || "",
        categories: selectedProduct.categories.map((cat) => cat._id) || [],
        variants: selectedProduct.variants || [],
        company: selectedProduct.company || "",
        stockKeepingUnit: selectedProduct.stockKeepingUnit || "",
        isFeatured: selectedProduct.isFeatured || false,
        isActive: selectedProduct.isActive || true,
        images: selectedProduct.images || [],
      });
      setPreviewImages(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle image upload (directly store in state)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file, // Store the file for upload
      preview: URL.createObjectURL(file), // Generate preview URL
    }));
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageUrls],
    }));

    // ✅ Update preview images separately for display
    setPreviewImages((prev) => [
      ...prev,
      ...newImages.map((img) => img.preview),
    ]);
  };

  // ✅ Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviewImages(updatedPreviews);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      updateProductById({ id, data: formData })
    );
    if (updateProductById.fulfilled.match(resultAction)) {
      navigate("/dashboard/manage-products");
    } else {
      console.error(resultAction.payload);
    }
  };

  if (status === "loading") return <p>Loading product...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-violet-600 mb-6">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* ✅ Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full border rounded-lg p-2"
          />
        </div>

        {/* ✅ Preview Images */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {previewImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/manage-products")}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
