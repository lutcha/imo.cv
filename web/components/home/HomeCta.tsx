'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function HomeCta() {
  const { t } = useLocale();
  return (
    <section className="border-t border-gray-200 bg-primary-blue-600 py-16 dark:bg-primary-blue-900">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-bold text-white">{t('home.ctaAgentTitle')}</h2>
        <p className="mt-2 text-primary-blue-100">{t('home.ctaAgentDesc')}</p>
        <Link
          href="/agente/login"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-primary-blue-700 transition-colors hover:bg-primary-blue-50"
        >
          {t('home.ctaAgentButton')}
        </Link>
      </div>
    </section>
  );
}
