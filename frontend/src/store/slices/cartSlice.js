import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart or increase the quantity
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increase by the passed quantity (1 for increment)
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      // Save cart to localStorage
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cartItems));
      }
    },

    // Decrease the quantity or remove the item
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload.id
          );
        } else {
          item.quantity -= 1;
        }
      }

      // Update localStorage
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      // Update localStorage after removing item
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      // Remove cart from localStorage when logging out
      const userId = localStorage.getItem("user_id");
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
    },

    setUser: (state, action) => {
      const userId = action.payload;
      console.log("Setting user with ID:", userId); // Add this log to check the value

      const savedCart = localStorage.getItem(`cart_${userId}`);

      if (savedCart) {
        state.cartItems = JSON.parse(savedCart);
      } else {
        state.cartItems = [];
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setUser,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
