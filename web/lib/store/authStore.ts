'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

export interface AuthState {
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
      setAuth: (user, accessToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', accessToken);
        }
        set({ user, accessToken });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        set({ user: null, accessToken: null });
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'imocv-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken }),
      // skipHydration: true prevents Zustand from running rehydrate() during
      // the server-side module evaluation (where localStorage doesn't exist).
      // Rehydration is triggered explicitly by HydrationProvider on the client.
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useAuthStore.getState().setHydrated();
      },
    }
  )
);
