import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import ProductCard from "@/layout/ProductCard";

const products = [
  {
    id: 1,
    name: "Notebook Set",
    price: "$12",
    image:
      "https://images.unsplash.com/photo-1601001435957-74f0958a93fb?q=80&w=400",
    description: "Premium quality notebooks with smooth paper.",
  },
  {
    id: 2,
    name: "Gel Pen Pack",
    price: "$8",
    image:
      "https://images.unsplash.com/photo-1597484660412-4fe5c1f3c9c8?q=80&w=400",
    description: "Smooth writing gel pens in assorted colors.",
  },
  {
    id: 3,
    name: "Highlighter Set",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=400",
    description: "Vibrant highlighters for organizing your notes.",
  },
  {
    id: 4,
    name: "Sticky Notes",
    price: "$5",
    image:
      "https://images.unsplash.com/photo-1600195077908-3e4d1044e41f?q=80&w=400",
    description: "Colorful sticky notes for quick reminders.",
  },
  {
    id: 5,
    name: "Pencil Case",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1621091211060-516b6f1e4e88?q=80&w=400",
    description: "Durable and stylish pencil case with compartments.",
  },
  {
    id: 6,
    name: "Mechanical Pencils",
    price: "$7",
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
      alert("Please log in to add items to your cart.");
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
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
