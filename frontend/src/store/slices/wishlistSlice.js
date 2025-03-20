import { createSlice } from "@reduxjs/toolkit";

// ✅ Load wishlist based on user_id
const getWishlistForUser = () => {
  const userId = localStorage.getItem("user_id");
  if (!userId) return [];
  try {
    const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Error parsing wishlist from localStorage:", error);
    return [];
  }
};

const initialState = {
  wishlistItems: getWishlistForUser(),
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
        const userId = localStorage.getItem("user_id");
        if (userId) {
          localStorage.setItem(
            `wishlist_${userId}`,
            JSON.stringify(state.wishlistItems)
          );
        }
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.setItem(
          `wishlist_${userId}`,
          JSON.stringify(state.wishlistItems)
        );
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.removeItem(`wishlist_${userId}`);
      }
    },
    setWishlist: (state, action) => {
      state.wishlistItems = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } =
  wishlistSlice.actions;

// ✅ Load wishlist for current user
export const loadWishlist = (userId) => (dispatch) => {
  if (userId) {
    try {
      const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
      const wishlistItems = storedWishlist ? JSON.parse(storedWishlist) : [];
      dispatch(setWishlist(wishlistItems));
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }
};

export default wishlistSlice.reducer;
