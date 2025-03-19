import mongoose from "mongoose";

//-----------------------WISHLIST SCHEMA--------------------------
const wishListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
      },
    ],
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
