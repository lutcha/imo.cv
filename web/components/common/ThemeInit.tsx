'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/uiStore';

/** Runs on mount to apply saved dark mode and system preference */
export function ThemeInit() {
  const setDarkMode = useUIStore((s) => s.setDarkMode);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved !== null ? saved === 'true' : prefersDark;
    setDarkMode(dark);
  }, [setDarkMode]);

  return null;
}
