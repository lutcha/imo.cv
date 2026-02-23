'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * Triggers Zustand-persist rehydration from localStorage explicitly on the
 * client. Required when `skipHydration: true` is set in the store config,
 * which prevents the store from trying to read localStorage during the
 * server-side module evaluation (where it would silently fail and leave
 * `isHydrated` stuck at `false` forever in the App Router).
 */
export function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
