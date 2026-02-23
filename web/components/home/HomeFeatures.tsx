'use client';

import { useLocale } from '@/lib/i18n/LocaleContext';

export function HomeFeatures() {
  const { t } = useLocale();
  return (
    <section className="border-b border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('home.feature1Title')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('home.feature1Desc')}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('home.feature2Title')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('home.feature2Desc')}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('home.feature3Title')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('home.feature3Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
