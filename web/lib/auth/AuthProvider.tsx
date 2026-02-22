'use client';

import { createContext, useContext, useMemo } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

type AuthContextValue = ReturnType<typeof useAuthStore>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuthStore();
  const value = useMemo(() => store, [store]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
