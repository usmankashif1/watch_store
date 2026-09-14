import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

const initialState: { items: Product[] } = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload as Product;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        return;
      }

      state.items.push(product);
    },

    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
