import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import ProductCardProducts from "@/layout/ProductCardProducts";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    name: "Notebook Set",
    mrp: "₹100",
    price: "₹12",
    image:
      "https://images.unsplash.com/photo-1601001435957-74f0958a93fb?q=80&w=400",
    description: "Premium quality notebooks with smooth paper.",
  },
  {
    id: 2,
    name: "Gel Pen Pack",
    mrp: "₹100",
    price: "₹8",
    image:
      "https://images.unsplash.com/photo-1573870796303-a663ab555fc0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Smooth writing gel pens in assorted colors.",
  },
  {
    id: 3,
    name: "Highlighter Set",
    mrp: "₹100",
    price: "₹10",
    image:
      "https://images.unsplash.com/photo-1641212443047-d7f35fd5eb16?q=80&w=1442&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Vibrant highlighters for organizing your notes.",
  },
  {
    id: 4,
    name: "Sticky Notes",
    mrp: "₹100",
    price: "₹5",
    image:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Colorful sticky notes for quick reminders.",
  },
  {
    id: 5,
    name: "Pencil Case",
    mrp: "₹100",
    price: "₹15",
    image:
      "https://images.unsplash.com/photo-1661732017125-f425c3e86467?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Durable and stylish pencil case with compartments.",
  },
  {
    id: 6,
    name: "Mechanical Pencils",
    mrp: "₹100",
    price: "₹7",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400",
    description: "Precision mechanical pencils for smooth writing.",
  },
];

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      // alert("Please log in to add items to your cart.");
      toast.warn("Please login first.");
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCardProducts
          key={product.id}
          id={product.id}
          name={product.name}
          mrp={product.mrp}
          price={product.price}
          image={product.image}
          onAddToCart={() => handleAddToCart(product)}
          onClick={() => navigate(`/product/${product.id}`)}
        />
      ))}
    </div>
  );
};

export default FeaturedProducts;
