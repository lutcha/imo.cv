'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function HomeFeaturedSection({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('home.featuredTitle')}
          </h2>
          <Link href="/search" className="text-imo-primary font-medium hover:underline dark:text-primary-blue-400">
            {t('home.viewAll')}
          </Link>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
