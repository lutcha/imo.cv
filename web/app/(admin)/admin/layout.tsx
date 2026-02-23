'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  ChartBarIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  HomeModernIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const nav = [
  { href: '/admin', label: 'Visão Geral', icon: ChartBarIcon },
  { href: '/admin/agentes', label: 'Agentes', icon: UserGroupIcon },
  { href: '/admin/condominios', label: 'Condomínios', icon: HomeModernIcon },
  { href: '/admin/imoveis', label: 'Imóveis', icon: BuildingOffice2Icon },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Cog6ToothIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user || user.role !== 'platform_admin') {
      router.replace('/agente/login');
    }
  }, [mounted, user, router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-imo-primary border-t-transparent" />
      </div>
    );
  }

  if (!user || user.role !== 'platform_admin') return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:w-60 md:border-b-0 md:border-r">
        <div className="mb-1">
          <Link
            href="/"
            className="block text-lg font-bold text-imo-dark dark:text-primary-blue-300"
          >
            imo.cv
          </Link>
          <span className="inline-block rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-400">
            Backoffice
          </span>
        </div>

        <nav className="mt-4 flex gap-1 md:flex-col">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-imo-surface text-imo-primary dark:bg-primary-blue-900/30 dark:text-primary-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <p className="text-xs capitalize text-gray-400 dark:text-gray-500">
            Administrador
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link
              href="/agente"
              className="text-xs text-gray-500 hover:underline dark:text-gray-400"
            >
              Área Agente
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="flex items-center gap-1 text-sm text-imo-primary hover:underline dark:text-primary-blue-400"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        id="main"
        className="flex-1 overflow-auto p-4 md:p-6"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
