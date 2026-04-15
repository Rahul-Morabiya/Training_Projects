import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Notification, NotificationType } from "../../types/notification";

interface NotificationStore {
  list: Notification[];
  add: (message: string, type: NotificationType) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      list: [],

      add: (message, type) => {
        set((state) => ({
          list: [
            {
              id: Date.now().toString(),
              message,
              type,
              createdAt: Date.now(),
            },
            ...state.list,
          ],
        }));
      },

      remove: (id) =>
        set((state) => ({
          list: state.list.filter((n) => n.id !== id),
        })),

      clear: () => set({ list: [] }),
    }),
    {
      name: "notification-store",
    }
  )
);