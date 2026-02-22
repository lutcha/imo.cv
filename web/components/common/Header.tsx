'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/lib/store/authStore';
import { useUIStore } from '@/lib/store/uiStore';
import { useTranslation } from '@/lib/i18n/LocaleContext';
import { SearchBar } from './SearchBar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';

interface HeaderProps {
  variant?: 'public' | 'agent';
  transparent?: boolean;
}

const LOCALES = [{ code: 'pt' as const, label: 'PT' }, { code: 'en' as const, label: 'EN' }, { code: 'fr' as const, label: 'FR' }];

export function Header({ variant = 'public', transparent = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <Link
          href="/"
          className="text-xl font-bold text-imo-dark dark:text-primary-blue-300"
        >
          imo.cv
        </Link>

        {/* Desktop: inline search (public only, hidden on small) */}
        {variant === 'public' && (
          <div className="hidden flex-1 max-w-xl lg:block">
            <SearchBar variant="inline" />
          </div>
        )}

        <nav className="flex items-center gap-2 sm:gap-4">
          {variant === 'public' && (
            <>
              <Link
                href="/search"
                className="hidden text-gray-600 hover:text-imo-primary dark:text-gray-400 dark:hover:text-primary-blue-400 sm:inline"
              >
                {t('nav.search')}
              </Link>
              <Link
                href="/agente"
                className="text-gray-600 hover:text-imo-primary dark:text-gray-400 dark:hover:text-primary-blue-400"
              >
                {t('nav.agentArea')}
              </Link>
            </>
          )}
          {isAgent && (
            <>
              <Link
                href="/agente"
                className="text-gray-600 hover:text-imo-primary dark:text-gray-400"
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                href="/agente/imoveis"
                className="text-gray-600 hover:text-imo-primary dark:text-gray-400"
              >
                {t('nav.properties')}
              </Link>
              <Link
                href="/agente/leads"
                className="text-gray-600 hover:text-imo-primary dark:text-gray-400"
              >
                {t('nav.leads')}
              </Link>
            </>
          )}
          <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-600 dark:bg-gray-800" role="group" aria-label="Idioma">
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-label={code === 'pt' ? 'Português' : code === 'en' ? 'English' : 'Français'}
                aria-pressed={locale === code}
                className={cn(
                  'rounded px-2 py-1 text-xs font-medium transition',
                  locale === code
                    ? 'bg-white text-primary-blue-600 shadow dark:bg-gray-700 dark:text-primary-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="flex items-center gap-1"
              >
                <UserCircleIcon className="h-5 w-5" />
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Link href="/agente/login">
                <Button variant="ghost" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/agente/login">
                <Button variant="primary" size="sm">
                  {t('nav.register')}
                </Button>
              </Link>
            </>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {variant === 'public' && (
              <div className="pb-2">
                <SearchBar variant="inline" />
              </div>
            )}
            <Link
              href="/search"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.search')}
            </Link>
            <Link
              href="/agente"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.agentArea')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
