import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice.js";
import cartReducer from "./slices/cartSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";
import productReducer from "./slices/productSlice.js";
import ordersReducer from "./slices/ordersSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    orders: ordersReducer,
  },
});
