'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';

const nav = [
  { href: '/agente', label: 'Dashboard' },
  { href: '/agente/imoveis', label: 'Imóveis' },
  { href: '/agente/leads', label: 'Leads' },
  { href: '/agente/configuracoes', label: 'Configurações' },
];

export default function AgenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isHydrated } = useAuth();
  const isLoginPage = pathname === '/agente/login';

  useEffect(() => {
    if (isLoginPage || !isHydrated) return;
    if (!user) router.replace('/agente/login');
  }, [isLoginPage, isHydrated, user, router]);

  if (isLoginPage) return <>{children}</>;
  if (!isHydrated || !user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:flex-row">
      <aside className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:w-56 md:border-b-0 md:border-r">
        <Link href="/" className="mb-6 block text-lg font-bold text-imo-dark dark:text-primary-blue-300">
          imo.cv
        </Link>
        <nav className="flex gap-1 md:flex-col">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === href
                  ? 'bg-imo-surface text-imo-primary dark:bg-primary-blue-900/30 dark:text-primary-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {user?.email ?? '—'}
          </p>
          <button
            type="button"
            onClick={() => logout()}
            className="mt-1 text-sm text-imo-primary hover:underline dark:text-primary-blue-400"
          >
            Sair
          </button>
        </div>
      </aside>
      <main id="main" className="flex-1 overflow-auto p-4 md:p-6" tabIndex={-1}>{children}</main>
    </div>
  );
}
