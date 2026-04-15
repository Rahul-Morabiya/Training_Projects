import { create } from "zustand";

export type OrderStateType =
  | "CART_READY"
  | "CHECKOUT_VALIDATED"
  | "ORDER_SUBMITTED"
  | "ORDER_SUCCESS"
  | "ORDER_FAILED";

export interface Order {
  id: string;
  items: any[];
  total: number;
  createdAt: number;
}

export interface OrderStore {
  state: OrderStateType;
  orders: Order[];
  currentOrderId: string | null;

  setState: (state: OrderStateType) => void;
  addOrder: (order: Order) => void;
  setCurrent: (id: string) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  state: "CART_READY",
  orders: [],
  currentOrderId: null,

  setState: (state) => set({ state }),

  addOrder: (order) =>
    set((s) => ({
      orders: [order, ...s.orders],
    })),

  setCurrent: (id) => set({ currentOrderId: id }),

  reset: () =>
    set({
      state: "CART_READY",
      currentOrderId: null,
    }),
}));