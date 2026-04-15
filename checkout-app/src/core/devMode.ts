import { create } from "zustand";

interface DevState {
  enabled: boolean;
  toggle: () => void;
}

export const useDevMode = create<DevState>((set) => ({
  enabled: false,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
}));