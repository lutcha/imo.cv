'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

/**
 * Error boundary for agent routes (/agente/*).
 */
export default function AgentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Agent route error:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <h2 className="text-lg font-bold text-red-800 dark:text-red-200">
          Erro na área agente
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          Ocorreu um erro. Pode tentar novamente ou voltar ao painel.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Tentar novamente</Button>
          <Link href="/agente">
            <Button variant="outline">Voltar ao painel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
