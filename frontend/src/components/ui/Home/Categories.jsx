import ProductCard from "@/layout/ProductCard";
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Notebooks",
    image:
      "https://images.unsplash.com/photo-1601001435957-74f0958a93fb?q=80&w=1480&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Pens & Pencils",
    image:
      "https://c8.alamy.com/comp/JCH008/pens-and-pencils-in-a-cup-can-isolated-on-white-background-JCH008.jpg",
  },
  {
    id: 3,
    name: "Art Supplies",
    image:
      "https://images.unsplash.com/photo-1550001437-281dcb39e26d?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Office Supplies",
    image:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1468&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Desk Accessories",
    image:
      "https://images.unsplash.com/photo-1627260119201-dea52faff0ee?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Craft Supplies",
    image:
      "https://images.unsplash.com/photo-1516783154360-123b392d0833?q=80&w=1632&auto=format&fit=crop",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <ProductCard
          key={category.id}
          id={category.id}
          name={category.name}
          image={category.image}
          type="category"
          onClick={() =>
            navigate(
              `/category/${category.name
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/\s+/g, "-")}`
            )
          }
        />
      ))}
    </div>
  );
};

export default Categories;
