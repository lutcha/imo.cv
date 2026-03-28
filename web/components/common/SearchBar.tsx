'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ISLANDS, LISTING_TYPES, PRICE_SLIDER, AREA_SLIDER } from '@/lib/utils/constants';
import { useTranslation } from '@/lib/i18n/LocaleContext';
import type { PropertyFilters } from '@/lib/api/properties';
import { cn } from '@/lib/utils/helpers';
import { formatPrice } from '@/lib/utils/formatters';

interface SearchBarProps {
  onSearch?: (filters: PropertyFilters) => void;
  variant?: 'hero' | 'inline' | 'sidebar';
  defaultValues?: Partial<PropertyFilters>;
}

const emptyFilters: PropertyFilters = {};

export function SearchBar({
  onSearch,
  variant = 'inline',
  defaultValues = emptyFilters,
}: SearchBarProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [location, setLocation] = useState(defaultValues.island ?? '');
  const [listingType, setListingType] = useState(defaultValues.listing_type ?? '');
  const [propertyType, setPropertyType] = useState(defaultValues.property_type ?? '');
  const [minPrice, setMinPrice] = useState(
    String(defaultValues.min_price ?? defaultValues.price_min ?? '')
  );
  const [maxPrice, setMaxPrice] = useState(
    String(defaultValues.max_price ?? defaultValues.price_max ?? '')
  );
  const [minArea, setMinArea] = useState(
    String(defaultValues.min_area ?? '')
  );
  const [maxArea, setMaxArea] = useState(
    String(defaultValues.max_area ?? '')
  );
  const [bedrooms, setBedrooms] = useState(defaultValues.bedrooms ?? '');
  const [useSliders, setUseSliders] = useState(true);

  const buildFilters = useCallback((): PropertyFilters => {
    const f: PropertyFilters = { page: 1, limit: 24 };
    if (location) f.island = location;
    if (listingType) f.listing_type = listingType;
    if (propertyType) f.property_type = propertyType;
    const pMin = minPrice ? Number(minPrice) : undefined;
    const pMax = maxPrice ? Number(maxPrice) : undefined;
    if (pMin != null) f.price_min = pMin;
    if (pMax != null) f.price_max = pMax;
    const aMin = minArea ? Number(minArea) : undefined;
    const aMax = maxArea ? Number(maxArea) : undefined;
    if (aMin != null) f.min_area = aMin;
    if (aMax != null) f.max_area = aMax;
    if (bedrooms) f.bedrooms = Number(bedrooms);
    return f;
  }, [location, listingType, propertyType, minPrice, maxPrice, minArea, maxArea, bedrooms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = buildFilters();
    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v != null && v !== '') params.set(k, String(v));
      });
      router.push(`/search?${params.toString()}`);
    }
  };

  const isHero = variant === 'hero';
  const isSidebar = variant === 'sidebar';
  const isInline = variant === 'inline';
  const minPriceNum = Math.min(Number(minPrice) || PRICE_SLIDER.min, PRICE_SLIDER.max);
  const maxPriceNum = Math.min(Math.max(Number(maxPrice) || PRICE_SLIDER.max, PRICE_SLIDER.min), PRICE_SLIDER.max);

  /* ─── Inline (header) variant: compact, single row ─── */
  if (isInline) {
    return (
      <form
        role="search"
        aria-label={t('search.title') || 'Pesquisar imóveis'}
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          aria-label={t('search.island')}
        >
          <option value="">{t('search.placeholderLocation') || 'Ilha, cidade ou zona'}</option>
          {ISLANDS.map((island) => (
            <option key={island} value={island}>
              {island}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" aria-label={t('search.searchButton')}>
          <MagnifyingGlassIcon className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">{t('search.searchButton')}</span>
        </Button>
      </form>
    );
  }

  return (
    <form
      role="search"
      aria-label={t('search.title') || 'Pesquisar imóveis'}
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-3',
        isHero && 'w-full max-w-4xl rounded-2xl bg-white/95 p-6 shadow-xl dark:bg-gray-800/95 sm:flex-row sm:flex-wrap sm:items-end',
        isSidebar && 'space-y-4'
      )}
    >
      {/* Tipo: Comprar / Arrendar */}
      <div className={cn('w-full', isSidebar && 'space-y-2')}>
        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          {t('search.listingType')}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={listingType === 'sale'}
            aria-label={t('search.buy')}
            onClick={() => setListingType(listingType === 'sale' ? '' : 'sale')}
            className={cn(
              'rounded-lg border-2 px-4 py-2 text-sm font-medium transition',
              listingType === 'sale'
                ? 'border-primary-blue-600 bg-primary-blue-600 text-white dark:border-primary-blue-500 dark:bg-primary-blue-500'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
            )}
          >
            {t('search.buy')}
          </button>
          <button
            type="button"
            aria-pressed={listingType === 'rent'}
            aria-label={t('search.rent')}
            onClick={() => setListingType(listingType === 'rent' ? '' : 'rent')}
            className={cn(
              'rounded-lg border-2 px-4 py-2 text-sm font-medium transition',
              listingType === 'rent'
                ? 'border-primary-blue-600 bg-primary-blue-600 text-white dark:border-primary-blue-500 dark:bg-primary-blue-500'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
            )}
          >
            {t('search.rent')}
          </button>
        </div>
      </div>

      <div className={cn('flex-1 min-w-[140px]', isSidebar && 'w-full')}>
        <label htmlFor="search-island" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          {t('search.island')}
        </label>
        <select
          id="search-island"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">{t('common.all')}</option>
          {ISLANDS.map((island) => (
            <option key={island} value={island}>
              {island}
            </option>
          ))}
        </select>
      </div>

      {/* Preço: sliders ou inputs */}
      {isSidebar && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('search.priceRange')}
            </label>
            <button
              type="button"
              aria-label={useSliders ? t('search.exactValues') : t('search.useSliders')}
              onClick={() => setUseSliders((u) => !u)}
              className="text-xs text-primary-blue-600 hover:underline dark:text-primary-blue-400"
            >
              {useSliders ? t('search.exactValues') : t('search.useSliders')}
            </button>
          </div>
          {useSliders ? (
            <>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('search.priceMin')}: {formatPrice(minPriceNum)} — {t('search.priceMax')}: {formatPrice(maxPriceNum)}
                </p>
                <input
                  type="range"
                  min={PRICE_SLIDER.min}
                  max={PRICE_SLIDER.max}
                  step={PRICE_SLIDER.step}
                  value={minPriceNum}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full accent-primary-blue-600"
                  aria-label={t('search.priceMin')}
                />
                <input
                  type="range"
                  min={PRICE_SLIDER.min}
                  max={PRICE_SLIDER.max}
                  step={PRICE_SLIDER.step}
                  value={maxPriceNum}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-primary-blue-600"
                  aria-label={t('search.priceMax')}
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="py-2"
              />
              <Input
                type="number"
                placeholder="—"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="py-2"
              />
            </div>
          )}
        </div>
      )}

      {!isSidebar && (
        <>
          <div className="flex-1 min-w-[120px]">
            <label htmlFor="search-min-price" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('search.priceMin')}
            </label>
            <Input
              id="search-min-price"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="py-2"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label htmlFor="search-max-price" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('search.priceMax')}
            </label>
            <Input
              id="search-max-price"
              type="number"
              placeholder="—"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="py-2"
            />
          </div>
        </>
      )}

      {/* Área (sidebar): number inputs */}
      {isSidebar && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {t('search.area')} (m²)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="search-min-area" className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                {t('search.areaMin') || 'Área min. (m²)'}
              </label>
              <Input
                id="search-min-area"
                type="number"
                min={0}
                placeholder="0"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="py-2"
                aria-label={t('search.areaMin') || 'Área mínima em m²'}
              />
            </div>
            <div>
              <label htmlFor="search-max-area" className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                {t('search.areaMax') || 'Área max. (m²)'}
              </label>
              <Input
                id="search-max-area"
                type="number"
                min={0}
                placeholder="Ex: 200"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                className="py-2"
                aria-label={t('search.areaMax') || 'Área máxima em m²'}
              />
            </div>
          </div>
        </div>
      )}

      <div className={cn('flex-1 min-w-[100px]', isSidebar && 'w-full')}>
        <label htmlFor="search-bedrooms" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          {t('search.bedrooms')}
        </label>
        <select
          id="search-bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">{t('common.any')}</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" size={isHero ? 'lg' : 'md'} className="shrink-0" aria-label={t('search.searchButton')}>
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden />
        {t('search.searchButton')}
      </Button>
    </form>
  );
}
