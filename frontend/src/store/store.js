import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice.js";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
