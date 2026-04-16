import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isCheckoutLocked } from "../../core/checkoutLock";
import { useNotificationStore } from "../notifications/notification.store";
import type { CartItem } from "../../types/cart";

const generateChecksum = (items: Record<string, CartItem>) => {
  return JSON.stringify(items);
};

interface CartState {
  itemsById: Record<string, CartItem>;
  itemIds: string[];
  checksum: string;
  version: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;

  validate: () => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      itemsById: {},
      itemIds: [],
      checksum: "",
      version: 1,

      addItem: (item) => {
        if (isCheckoutLocked()) {
  useNotificationStore
    .getState()
    .add("Blocked: checkout in another tab", "warning");
  return;
}

        set((state) => {
          const id = String(item.id);
          const existing = state.itemsById[id];

          const updatedItems = {
            ...state.itemsById,
            [id]: existing
              ? { ...existing, qty: existing.qty + 1 }
              : item,
          };

          return {
            itemsById: updatedItems,
            itemIds: Object.keys(updatedItems),
            version: state.version + 1,
            checksum: generateChecksum(updatedItems),
          };
        });
      },

      removeItem: (id) => {
        if (isCheckoutLocked()) {
  useNotificationStore
    .getState()
    .add("Blocked: checkout in another tab", "warning");
  return;
}

        set((state) => {
          const newItems = { ...state.itemsById };
          delete newItems[id];

          return {
            itemsById: newItems,
            itemIds: Object.keys(newItems),
            version: state.version + 1,
            checksum: generateChecksum(newItems),
          };
        });
      },

      decrementItem: (id) => {
        if (isCheckoutLocked()) {
  useNotificationStore
    .getState()
    .add("Blocked: checkout in another tab", "warning");
  return;
}

        set((state) => {
          const item = state.itemsById[id];
          if (!item) return state;

          const newItems = { ...state.itemsById };

          if (item.qty === 1) {
            delete newItems[id];
          } else {
            newItems[id] = {
              ...item,
              qty: item.qty - 1,
            };
          }

          return {
            itemsById: newItems,
            itemIds: Object.keys(newItems),
            version: state.version + 1,
            checksum: generateChecksum(newItems),
          };
        });
      },

      validate: () => {
        const state = get();
        const newChecksum = generateChecksum(state.itemsById);
        return newChecksum === state.checksum;
      },
    }),
    {
      name: "cart-store",
    }
  )
);