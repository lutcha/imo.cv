'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/lib/store/authStore';
import { useUIStore } from '@/lib/store/uiStore';
import { useTranslation } from '@/lib/i18n/LocaleContext';
import { SearchBar } from './SearchBar';
import { NotificationBell } from './NotificationBell';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';

interface HeaderProps {
  variant?: 'public' | 'agent';
  transparent?: boolean;
}

const LOCALES = [
  { code: 'pt' as const, label: 'PT', flag: '🇵🇹' },
  { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
  { code: 'fr' as const, label: 'FR', flag: '🇫🇷' },
];

const SOLUTIONS = [
  { href: '/ferias', label: 'Férias', color: '#ec7f13' },
  { href: '/solucoes/condominios', label: 'Condomínios', color: '#008542' },
  { href: '/simuladores', label: 'Simuladores', color: '#005baa' },
  { href: '/obras-novas', label: 'Novas Construções', color: '#1e3b8a' },
];

function LocaleDropdown({ locale, setLocale }: { locale: string; setLocale: (c: 'pt' | 'en' | 'fr') => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
        aria-label="Idioma"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-28 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {LOCALES.map(({ code, label, flag }) => (
            <button
              key={code}
              type="button"
              onClick={() => { setLocale(code); setOpen(false); }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800',
                locale === code ? 'font-semibold text-[#005baa] dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              )}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SolucoesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-[#005baa] dark:text-gray-400 dark:hover:text-white"
      >
        Soluções
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header({ variant = 'public', transparent = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolucoesOpen, setMobileSolucoesOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { t, locale, setLocale } = useTranslation();
  const isAgent = variant === 'agent' && user;
  const darkMode = useUIStore((s) => s.darkMode);
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-colors',
        transparent
          ? 'border-transparent bg-transparent'
          : 'border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-black"
          style={{ color: '#005baa' }}
        >
          imo.cv
        </Link>

        {/* Desktop: inline search (public only) */}
        {variant === 'public' && (
          <div className="hidden flex-1 max-w-xl lg:block">
            <SearchBar variant="inline" />
          </div>
        )}

        <nav className="flex items-center gap-2 sm:gap-3">
          {variant === 'public' && (
            <>
              {/* Soluções dropdown */}
              <SolucoesDropdown />

              <Link
                href="/search?listing_type=sale"
                className="hidden text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400 dark:hover:text-white sm:inline"
              >
                {t('nav.buy')}
              </Link>
              <Link
                href="/search?listing_type=rent"
                className="hidden text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400 dark:hover:text-white sm:inline"
              >
                {t('nav.rent')}
              </Link>
              <Link
                href="/agente/login"
                className="hidden text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400 dark:hover:text-white md:inline"
              >
                {t('nav.agentArea')}
              </Link>
              {/* Primary CTA — imo-orange */}
              <Link
                href={user ? '/agente/imoveis/novo' : '/agente/login'}
                className="hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110"
                style={{ backgroundColor: '#ec7f13' }}
              >
                Começar agora
              </Link>
            </>
          )}

          {isAgent && (
            <>
              <Link
                href="/agente"
                className="text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400"
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                href="/agente/imoveis"
                className="text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400"
              >
                {t('nav.properties')}
              </Link>
              <Link
                href="/agente/leads"
                className="text-sm text-gray-600 hover:text-[#005baa] dark:text-gray-400"
              >
                {t('nav.leads')}
              </Link>
            </>
          )}

          {/* Notification bell — visible when authenticated */}
          {user && <NotificationBell />}

          {/* Locale switcher — compact dropdown */}
          <LocaleDropdown locale={locale} setLocale={setLocale} />

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => logout()} className="flex items-center gap-1">
                <UserCircleIcon className="h-5 w-5" />
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/agente/login">
              <Button variant="ghost" size="sm">
                {t('nav.login')}
              </Button>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {variant === 'public' && (
              <>
                <div className="pb-2">
                  <SearchBar variant="inline" />
                </div>

                {/* Soluções accordion in mobile */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileSolucoesOpen((o) => !o)}
                >
                  <span className="font-medium">Soluções</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${mobileSolucoesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSolucoesOpen && (
                  <div className="ml-3 space-y-1 border-l-2 pl-3" style={{ borderColor: '#005baa' }}>
                    {SOLUTIONS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300"
                        onClick={() => setMobileOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  href="/search?listing_type=sale"
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.buy')}
                </Link>
                <Link
                  href="/search?listing_type=rent"
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.rent')}
                </Link>
                <Link
                  href="/agente/login"
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.agentArea')}
                </Link>
                <Link
                  href={user ? '/agente/imoveis/novo' : '/agente/login'}
                  className="block rounded-lg px-3 py-2 text-center font-bold text-white"
                  style={{ backgroundColor: '#ec7f13' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Começar agora
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
