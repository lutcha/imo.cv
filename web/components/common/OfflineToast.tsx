'use client';

import { useState, useEffect } from 'react';

/** Shows a toast when the user goes offline (4G/3G resilience). */
export function OfflineToast() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (!mounted || isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[9998] rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-100 sm:left-auto sm:right-4 sm:max-w-sm"
    >
      Sem ligação à internet. Algumas funcionalidades podem estar limitadas.
    </div>
  );
}
