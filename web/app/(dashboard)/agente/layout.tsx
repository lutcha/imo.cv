'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';

const nav = [
  { href: '/agente', label: 'Dashboard' },
  { href: '/agente/imoveis', label: 'Imóveis' },
  { href: '/agente/market-intelligence', label: 'Market Intelligence' },
  { href: '/agente/leads', label: 'Leads' },
  { href: '/agente/crm', label: 'CRM' },
  { href: '/agente/condominios', label: 'Condomínios' },
  { href: '/agente/configuracoes', label: 'Configurações' },
];

export default function AgenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isLoginPage = pathname === '/agente/login';

  // `mounted` becomes true after first client render. At that point
  // HydrationProvider (in root layout) has already triggered Zustand-persist
  // rehydration, so `user` reflects the actual localStorage state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!mounted || isLoginPage) return;
    if (!user) router.replace('/agente/login');
  }, [mounted, isLoginPage, user, router]);

  if (isLoginPage) return <>{children}</>;

  if (!mounted) return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-imo-primary border-t-transparent" />
    </div>
  );

  if (!user) return null;

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
                pathname === href || (href !== '/agente' && pathname.startsWith(href))
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
            {user.email}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
            {user.role?.replace('_', ' ')}
          </p>
          {user.role === 'platform_admin' && (
            <Link
              href="/admin"
              className="mt-2 block text-xs font-semibold text-imo-primary hover:underline dark:text-primary-blue-400"
            >
              ⚙ Backoffice
            </Link>
          )}
          <button
            type="button"
            onClick={() => logout()}
            className="mt-2 text-sm text-imo-primary hover:underline dark:text-primary-blue-400"
          >
            Sair
          </button>
        </div>
      </aside>
      <main id="main" className="flex-1 overflow-auto p-4 md:p-6" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
