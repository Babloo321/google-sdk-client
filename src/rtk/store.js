import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice"; // Ensure correct path
export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});
