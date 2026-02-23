import { Suspense } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import SearchFilters from '@/components/properties/SearchFilters';
import SearchMap from '@/components/properties/SearchMap';
import { SkeletonCard, SkeletonMap } from '@/components/common/Skeleton';
import type { PropertyFilters } from '@/lib/api/properties';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filters: PropertyFilters = {
    page: params.page ? Number(params.page) : 1,
    limit: 24,
    island: params.island as string,
    listing_type: params.listing_type as string,
    property_type: params.property_type as string,
    price_min: Number(params.min_price || params.price_min) || undefined,
    price_max: Number(params.max_price || params.price_max) || undefined,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
  };

  const showMap = params.view === 'map';

  // Build URL strings to avoid Next.js using deprecated url.parse() with object hrefs
  function buildSearchUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...params, ...overrides })) {
      if (v !== undefined && v !== null && v !== '') p.set(k, String(v));
    }
    return `/search?${p.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Imóveis em Cabo Verde
        </h1>
        <div className="flex gap-2">
          <Link
            href={buildSearchUrl({ view: 'list' })}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${!showMap
                ? 'bg-imo-primary text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Lista
          </Link>
          <Link
            href={buildSearchUrl({ view: 'map' })}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${showMap
                ? 'bg-imo-primary text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Mapa
          </Link>
        </div>
      </div>

      {/* Two-column layout: sidebar filters + main content */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Sidebar filters (hidden on mobile, collapsible later) */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Filtros
            </h2>
            <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />}>
              <SearchFilters filters={filters} />
            </Suspense>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {showMap ? (
            <Suspense fallback={<SkeletonMap />}>
              <SearchMap filters={filters} />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              }
            >
              <PropertyList filters={filters} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
