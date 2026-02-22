'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import type { Locale, Translations } from './types';

import pt from './translations/pt.json';
import en from './translations/en.json';
import fr from './translations/fr.json';

const translations: Record<Locale, Translations> = { pt, en, fr };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const defaultLocale: Locale = 'pt';
const STORAGE_KEY = 'imocv-locale';

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && (stored === 'pt' || stored === 'en' || stored === 'fr'))
    return stored;
  return defaultLocale;
}

function getTranslation(obj: unknown, key: string): string {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return key;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : key;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getStoredLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale === 'fr' ? 'fr' : newLocale === 'en' ? 'en' : 'pt-CV';
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== 'undefined')
      document.documentElement.lang = locale === 'fr' ? 'fr' : locale === 'en' ? 'en' : 'pt-CV';
  }, [locale, mounted]);

  const t = useCallback(
    (key: string) => getTranslation(translations[locale], key),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useTranslation() {
  const { t, locale, setLocale } = useLocale();
  return { t, locale, setLocale };
}
