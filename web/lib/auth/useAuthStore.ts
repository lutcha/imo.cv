import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'buyer' | 'agent' | 'agency_admin' | 'platform_admin';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  agency_id: number | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'imocv-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken }),
      onRehydrateStorage: () => () => {
        useAuthStore.getState().setHydrated();
      },
    }
  )
);
