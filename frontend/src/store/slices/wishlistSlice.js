import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [], // Stores wishlist items
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlistItems.find(
        (wishlistItem) => wishlistItem.id === item.id
      );
      if (!existingItem) {
        state.wishlistItems.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
