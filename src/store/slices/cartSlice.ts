import { createSlice } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types/product";

const initialState: { items: CartItem[] } = {
  items: [],
};

const priceToNumber = (price: number) => {
  return Number.isFinite(price) ? price : 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload as Product;
      const existingItems = Array.isArray(state.items)
        ? state.items
        : [];

      const existingItem = existingItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      existingItems.push({
        ...product,
        price: priceToNumber(product.price),
        quantity: 1,
      });

      state.items = existingItems;
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (x) => x.id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (x) => x.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.items = state.items.filter(
          (x) => x.id !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;