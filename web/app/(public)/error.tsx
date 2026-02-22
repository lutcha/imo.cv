'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

/**
 * Error boundary for public routes (/, /search, /property/[id]).
 */
export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Public route error:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md rounded-xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-800 dark:bg-amber-900/20">
        <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200">
          Erro ao carregar
        </h2>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          Não foi possível carregar esta página. Tente novamente ou volte à pesquisa.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Tentar novamente</Button>
          <Link href="/search">
            <Button variant="outline">Ir para pesquisa</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
