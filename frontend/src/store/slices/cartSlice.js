import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems:
    JSON.parse(
      localStorage.getItem(`cart_${localStorage.getItem("user_id")}`)
    ) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart or increase the quantity
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item._id === newItem._id &&
          (!newItem.selectedVariant ||
            (item.selectedVariant &&
              item.selectedVariant.color.name ===
                newItem.selectedVariant.color.name &&
              item.selectedVariant.size === newItem.selectedVariant.size))
      );

      // console.log(`existing item : ${JSON.stringify(existingItem, null, 2)}`);

      if (existingItem) {
        // ✅ If adding a variant, limit to the variant stock quantity
        if (newItem.selectedVariant) {
          if (existingItem.quantity < newItem.selectedVariant.stockQuantity) {
            existingItem.quantity++;
          } else {
            toast.error(
              `Only ${newItem.selectedVariant.stockQuantity} available for this variant`
            );
          }
        }
        // ✅ If not a variant, limit to the general stock quantity
        else {
          if (existingItem.quantity < newItem.stockQuantity) {
            existingItem.quantity++;
          } else {
            toast.error(`Only ${newItem.stockQuantity} available in stock`);
          }
        }
      } else {
        // ✅ Add new item if within stock limit
        if (newItem.selectedVariant) {
          if (newItem.selectedVariant.stockQuantity > 0) {
            state.cartItems.push({ ...newItem, quantity: 1 });
          } else {
            toast.error(`This variant is out of stock`);
          }
        } else {
          if (newItem.stockQuantity > 0) {
            state.cartItems.push({ ...newItem, quantity: 1 });
          } else {
            toast.error(`This product is out of stock`);
          }
        }
      }

      localStorage.setItem(
        `cart_${localStorage.getItem("user_id")}`,
        JSON.stringify(state.cartItems)
      );
    },

    // Decrease the quantity or remove the item
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) =>
          item._id === action.payload._id &&
          (!action.payload.selectedVariant ||
            (item.selectedVariant &&
              item.selectedVariant.color.name ===
                action.payload.selectedVariant.color.name &&
              item.selectedVariant.size ===
                action.payload.selectedVariant.size))
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) =>
              i._id !== item._id || i.selectedVariant !== item.selectedVariant
          );
        }
      }

      localStorage.setItem(
        `cart_${localStorage.getItem("user_id")}`,
        JSON.stringify(state.cartItems)
      );
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
