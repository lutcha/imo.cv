'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EsqueciPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-primary-blue-600 dark:text-primary-blue-400">
          Recuperar palavra-passe
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Em breve poderá solicitar a redefinição por email. Contacte o suporte ou a sua agência.
        </p>
        <Link
          href="/agente/login"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-blue-600 hover:underline dark:text-primary-blue-400"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar ao login
        </Link>
      </div>
    </div>
  );
}
