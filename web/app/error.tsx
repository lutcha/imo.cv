'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

/**
 * Root error boundary. Catches errors in the root layout and below.
 * Per Next.js App Router, this only catches errors in child segments;
 * use global-error.tsx for errors in root layout itself.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('App error boundary:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <h1 className="text-xl font-bold text-red-800 dark:text-red-200">
          Algo correu mal
        </h1>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          Ocorreu um erro inesperado. Pode tentar novamente ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Tentar novamente</Button>
          <Link href="/">
            <Button variant="outline">Voltar ao início</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
