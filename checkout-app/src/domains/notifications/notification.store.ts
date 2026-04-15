import { create } from "zustand";
import type { Notification } from "../../types/notification";

const priorityMap: Record<string, number> = {
  error: 3,
  warning: 2,
  info: 1,
  success: 1,
};

export const useNotificationStore = create<any>((set) => ({
  list: [],

  add: (message: string, type: string) =>
    set((state: any) => {
      const exists = state.list.find((n: any) => n.message === message);
      if (exists) return state;

      const updated = [
        ...state.list,
        {
          id: Date.now().toString(),
          message,
          type,
          createdAt: Date.now(),
        },
      ];

      updated.sort((a, b) => priorityMap[b.type] - priorityMap[a.type]);

      return { list: updated };
    }),

  remove: (id: string) =>
    set((state: any) => ({
      list: state.list.filter((n: any) => n.id !== id),
    })),
}));