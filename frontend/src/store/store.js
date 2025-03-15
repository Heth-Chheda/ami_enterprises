import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice.js";
import cartReducer from "./slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
  },
});
