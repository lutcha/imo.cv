'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Thin top progress bar on route change. Lightweight (transform/opacity) for 4G.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    const t1 = setTimeout(() => setProgress(25), 50);
    const t2 = setTimeout(() => setProgress(70), 350);
    const t3 = setTimeout(() => {
      setProgress(100);
      const hide = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(hide);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9999] h-0.5 bg-imo-primary dark:bg-primary-blue-400"
      style={{
        width: `${progress}%`,
        transition: progress <= 25 ? 'width 0.2s ease-out' : 'width 0.25s ease-out',
      }}
    />
  );
}
