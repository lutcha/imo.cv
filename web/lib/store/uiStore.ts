'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.darkMode;
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', newValue);
            localStorage.setItem('darkMode', String(newValue));
          }
          return { darkMode: newValue };
        }),
      setDarkMode: (value) =>
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', value);
            localStorage.setItem('darkMode', String(value));
          }
          return { darkMode: value };
        }),
    }),
    { name: 'imocv-ui' }
  )
);
