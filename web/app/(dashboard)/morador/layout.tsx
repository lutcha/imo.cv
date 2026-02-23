'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Squares2X2Icon,
  CreditCardIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const nav = [
  { href: '/morador', label: 'Dashboard', icon: Squares2X2Icon, exact: true },
  { href: '/morador/contas', label: 'Minhas Contas', icon: CreditCardIcon },
  { href: '/morador/comunicados', label: 'Comunicados', icon: MegaphoneIcon },
  { href: '/morador/reservas', label: 'Reserva de Áreas', icon: CalendarDaysIcon },
  { href: '/morador/votacoes', label: 'Votações', icon: HandRaisedIcon },
];

export default function MoradorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:w-56 md:min-h-screen md:border-b-0 md:border-r md:flex md:flex-col">
        <div className="p-4 md:p-5">
          <Link href="/" className="mb-0.5 block text-lg font-black" style={{ color: '#008542' }}>
            imo.cv
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Resident Portal
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
                    ? 'bg-green-50 font-bold text-[#008542] dark:bg-green-900/20 dark:text-green-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Unit info at bottom */}
        <div className="hidden md:block mt-auto border-t border-gray-100 dark:border-gray-700 p-4">
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Unidade 402 – Bloco A</p>
            <p className="mt-0.5 text-sm font-black text-gray-900 dark:text-white">João Silva</p>
          </div>
          <Link
            href="/agente/login"
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: '#008542' }}
          >
            <Cog6ToothIcon className="h-4 w-4" />
            Configurações
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
