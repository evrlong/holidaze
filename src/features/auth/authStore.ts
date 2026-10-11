import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./types";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User, accessToken: string) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user, accessToken) => set({ user, accessToken }),
      clearUser: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "holidaze-storage",
    },
  ),
);
