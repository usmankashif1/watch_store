import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/product";

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  total: number;
  tax: number;
  shipping: number;
  paymentMethod: "cash" | "card";
  createdAt: string;
  status: string;
}

const initialState: { items: Order[] } = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload as Order);
    },
    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
