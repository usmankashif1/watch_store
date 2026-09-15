import type { CartItem } from "../types/product";

export type PaymentMethod = "cash" | "card";

export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderDraft {
  id: string;
  customer: CheckoutCustomer;
  items: CartItem[];
  total: number;
  tax: number;
  shipping: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  status: string;
}

export const makeOrderDraft = (
  customer: CheckoutCustomer,
  items: CartItem[],
  paymentMethod: PaymentMethod,
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  }
): OrderDraft => ({
  id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
  customer,
  items,
  total: totals.total,
  tax: totals.tax,
  shipping: totals.shipping,
  paymentMethod,
  createdAt: new Date().toISOString(),
  status: "Processing",
});
