import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
let wishlistItems = [];
try {
  const storedWishlist = localStorage.getItem("wishlist");
  wishlistItems = storedWishlist ? JSON.parse(storedWishlist) : [];
} catch (error) {
  console.error("Error parsing wishlist from localStorage:", error);
}

const initialState = {
  wishlistItems,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlistItems.find(
        (wishlistItem) => wishlistItem._id === item._id
      );
      if (!existingItem) {
        state.wishlistItems.push(item);
        // Save to localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      // Update localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      // Clear localStorage
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
