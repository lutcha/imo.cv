// lib/i18n/server.ts
import pt from './translations/pt.json';
import en from './translations/en.json';
import fr from './translations/fr.json';
import type { Locale, Translations } from './types';

const translations: Record<Locale, Translations> = { pt, en, fr };

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
