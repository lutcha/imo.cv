// lib/i18n/server.ts
import { cookies } from 'next/headers';
import pt from './translations/pt.json';
import en from './translations/en.json';
import fr from './translations/fr.json';
import type { Locale, Translations } from './types';
import { LOCALE_COOKIE_NAME } from './constants';

const translations: Record<Locale, Translations> = { pt, en, fr };

const VALID_LOCALES: Locale[] = ['pt', 'en', 'fr'];

/** Use in RSC to get locale from cookie (set by client language switcher). */
export async function getLocaleFromCookies(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE_NAME)?.value;
  if (value && VALID_LOCALES.includes(value as Locale)) return value as Locale;
  return 'pt';
}

export function getTranslation(key: string, locale: Locale = 'pt'): string {
    const parts = key.split('.');
    let current: any = translations[locale] || translations['pt'];

    for (const part of parts) {
        if (current == null || typeof current !== 'object') return key;
        current = current[part];
    }

    return typeof current === 'string' ? current : key;
}

export const t = getTranslation;
