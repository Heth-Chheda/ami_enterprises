import { Category, Product } from "../models/productModel.js";

export const seedData = async () => {
  try {
    // Clean existing data
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Data cleared...");

    // ---------------------- Insert Main Categories -----------------------
    const mainCategories = await Category.insertMany([
      { name: "Writing Instruments", slug: "writing-instruments" },
      { name: "Paper Products", slug: "paper-products" },
      { name: "Office Supplies", slug: "office-supplies" },
      { name: "Art Supplies", slug: "art-supplies" },
      { name: "School Supplies", slug: "school-supplies" },
    ]);

    console.log("Main Categories Added:", mainCategories);

    // ---------------------- Insert Subcategories -----------------------
    const subcategories = await Category.insertMany([
      { name: "Pens", slug: "pens", parentCategory: mainCategories[0]._id },
      {
        name: "Notebooks",
        slug: "notebooks",
        parentCategory: mainCategories[1]._id,
      },
      {
        name: "Staplers",
        slug: "staplers",
        parentCategory: mainCategories[2]._id,
      },
      { name: "Paints", slug: "paints", parentCategory: mainCategories[3]._id },
      {
        name: "Pencil Cases",
        slug: "pencil-cases",
        parentCategory: mainCategories[4]._id,
      },
    ]);

    console.log("Subcategories Added:", subcategories);

    // ---------------------- Insert Products -----------------------
    const products = [
      {
        name: "Ballpoint Pen Set",
        slug: "ballpoint-pen-set",
        description: "Set of 10 smooth writing ballpoint pens.",
        mrp: 10.99,
        price: 8.99,
        stockQuantity: 100,
        categories: [mainCategories[0]._id, subcategories[0]._id],
        variants: [
          {
            color: { name: "Blue", hexCode: "#0000FF" },
            size: "Standard",
            stockQuantity: 50,
          },
          {
            color: { name: "Black", hexCode: "#000000" },
            size: "Standard",
            stockQuantity: 50,
          },
        ],
        images: ["https://example.com/ballpoint-pen.jpg"],
        company: "Parker",
        stockKeepingUnit: "BP1001",
        isFeatured: true,
      },
      {
        name: "Spiral Notebook A4",
        slug: "spiral-notebook-a4",
        description: "High-quality spiral notebook with 200 pages.",
        mrp: 5.99,
        price: 4.99,
        stockQuantity: 200,
        categories: [mainCategories[1]._id, subcategories[1]._id],
        variants: [
          {
            color: { name: "Red", hexCode: "#FF0000" },
            size: "A4",
            stockQuantity: 100,
          },
          {
            color: { name: "Blue", hexCode: "#0000FF" },
            size: "A4",
            stockQuantity: 100,
          },
        ],
        images: ["https://example.com/spiral-notebook.jpg"],
        company: "Classmate",
        stockKeepingUnit: "NB1002",
        isFeatured: false,
      },
      {
        name: "Heavy-Duty Stapler",
        slug: "heavy-duty-stapler",
        description: "Durable stapler suitable for heavy use.",
        mrp: 15.99,
        price: 12.99,
        stockQuantity: 30,
        categories: [mainCategories[2]._id, subcategories[2]._id],
        variants: [
          {
            color: { name: "Black", hexCode: "#000000" },
            size: "Large",
            stockQuantity: 30,
          },
        ],
        images: ["https://example.com/stapler.jpg"],
        company: "Kangaro",
        stockKeepingUnit: "ST1003",
        isFeatured: false,
      },
      {
        name: "Acrylic Paint Set",
        slug: "acrylic-paint-set",
        description: "Set of 12 vibrant acrylic paints.",
        mrp: 20.99,
        price: 18.99,
        stockQuantity: 50,
        categories: [mainCategories[3]._id, subcategories[3]._id],
        variants: [
          {
            color: { name: "Mixed Colors", hexCode: "#FFFFFF" },
            size: "Set of 12",
            stockQuantity: 50,
          },
        ],
        images: ["https://example.com/acrylic-paint.jpg"],
        company: "Camel",
        stockKeepingUnit: "AP1004",
        isFeatured: true,
      },
      {
        name: "Fabric Pencil Case",
        slug: "fabric-pencil-case",
        description: "Durable fabric pencil case with zipper.",
        mrp: 7.99,
        price: 5.99,
        stockQuantity: 100,
        categories: [mainCategories[4]._id, subcategories[4]._id],
        variants: [
          {
            color: { name: "Grey", hexCode: "#808080" },
            size: "Medium",
            stockQuantity: 100,
          },
        ],
        images: ["https://example.com/pencil-case.jpg"],
        company: "Faber-Castell",
        stockKeepingUnit: "PC1005",
        isFeatured: false,
      },
    ];

    await Product.insertMany(products);

    console.log("Products Added!");
  } catch (error) {
    console.error("Error Seeding Data:", error);
    throw new Error("Seeding failed");
  }
};
