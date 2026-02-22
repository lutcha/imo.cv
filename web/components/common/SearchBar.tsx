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
  const minPriceNum = Math.min(Number(minPrice) || PRICE_SLIDER.min, PRICE_SLIDER.max);
  const maxPriceNum = Math.min(Math.max(Number(maxPrice) || PRICE_SLIDER.max, PRICE_SLIDER.min), PRICE_SLIDER.max);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-3',
        isHero && 'w-full max-w-4xl rounded-2xl bg-white/95 p-6 shadow-xl dark:bg-gray-800/95',
        (variant === 'inline' || isHero) && 'sm:flex-row sm:flex-wrap sm:items-end',
        isSidebar && 'space-y-4'
      )}
    >
      {/* Tipo: Comprar / Arrendar (para quem quer comprar, arrendar ou ver ofertas) */}
      <div className={cn('w-full', isSidebar && 'space-y-2')}>
        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          {t('search.listingType')}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
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
              onClick={() => setUseSliders((u) => !u)}
              className="text-xs text-primary-blue-600 hover:underline dark:text-primary-blue-400"
            >
              {useSliders ? 'Valores exatos' : 'Sliders'}
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
                />
                <input
                  type="range"
                  min={PRICE_SLIDER.min}
                  max={PRICE_SLIDER.max}
                  step={PRICE_SLIDER.step}
                  value={maxPriceNum}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-primary-blue-600"
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
          <div className={cn('flex-1 min-w-[120px]', isSidebar && 'w-full')}>
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
          <div className={cn('flex-1 min-w-[120px]', isSidebar && 'w-full')}>
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

      {/* Área (sidebar): sliders opcionais */}
      {isSidebar && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {t('search.area')} (m²)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="range"
              min={AREA_SLIDER.min}
              max={AREA_SLIDER.max}
              step={AREA_SLIDER.step}
              value={minArea || AREA_SLIDER.min}
              onChange={(e) => setMinArea(e.target.value)}
              className="w-full accent-primary-blue-600"
            />
            <input
              type="range"
              min={AREA_SLIDER.min}
              max={AREA_SLIDER.max}
              step={AREA_SLIDER.step}
              value={maxArea || AREA_SLIDER.max}
              onChange={(e) => setMaxArea(e.target.value)}
              className="w-full accent-primary-blue-600"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('search.areaMin')}: {minArea || '0'} — {t('search.areaMax')}: {maxArea || '—'}
          </p>
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
      <Button type="submit" size={isHero ? 'lg' : 'md'} className="shrink-0">
        <MagnifyingGlassIcon className="h-5 w-5" />
        {t('search.searchButton')}
      </Button>
    </form>
  );
}
