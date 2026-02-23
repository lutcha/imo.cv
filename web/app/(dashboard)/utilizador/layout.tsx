'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Squares2X2Icon,
  HeartIcon,
  BellAlertIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const nav = [
  { href: '/utilizador', label: 'Dashboard', icon: Squares2X2Icon, exact: true },
  { href: '/utilizador/favoritos', label: 'Favoritos', icon: HeartIcon },
  { href: '/utilizador/alertas', label: 'Alertas de Pesquisa', icon: BellAlertIcon },
  { href: '/utilizador/mensagens', label: 'Mensagens', icon: ChatBubbleLeftEllipsisIcon },
  { href: '/utilizador/perfil', label: 'Meu Perfil', icon: UserCircleIcon },
];

export default function UtilizadorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:w-56 md:min-h-screen md:border-b-0 md:border-r md:flex md:flex-col">
        <div className="p-4 md:p-5">
          {/* Logo + product badge */}
          <Link href="/" className="mb-1 block text-lg font-black" style={{ color: '#005baa' }}>
            imo.cv
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Portal do Utilizador
          </span>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:overflow-x-visible md:px-3 md:pb-3">
          {nav.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-blue-50 font-bold text-[#005baa] dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User card at bottom (desktop) */}
        <div className="hidden md:block mt-auto border-t border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005baa] text-sm font-bold text-white">
              U
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900 dark:text-white">Utilizador</p>
              <p className="text-xs text-gray-400">Sal, Cabo Verde</p>
            </div>
          </div>
          <Link
            href="/agente/login"
            className="mt-3 block text-xs font-semibold hover:underline"
            style={{ color: '#005baa' }}
          >
            Sair →
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
