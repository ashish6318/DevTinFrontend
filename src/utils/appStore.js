import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure the path is correct
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestRedeucer from "./requestSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestRedeucer

  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default appStore;
