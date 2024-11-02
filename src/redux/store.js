// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer"; // Adjust the path as needed
import cartReducer from "./cartReducer";
import journalReducer from "./journalReducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    journal: journalReducer,
  },
});

export default store;
