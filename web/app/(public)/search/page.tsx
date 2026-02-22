import { Suspense } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import SearchFilters from '@/components/properties/SearchFilters';
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Imóveis em Cabo Verde
        </h1>
        <div className="flex gap-2">
          <Link
            href={{ query: { ...params, view: 'list' } }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${!showMap
                ? 'bg-imo-primary text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Lista
          </Link>
          <Link
            href={{ query: { ...params, view: 'map' } }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${showMap
                ? 'bg-imo-primary text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Mapa
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />}>
        <SearchFilters filters={filters} />
      </Suspense>

      {showMap ? (
        <Suspense fallback={<SkeletonMap />}>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            {/* MapboxMap would go here - we'll implement it as dynamic client component later if needed */}
            <div className="h-[500px] bg-gray-100 flex items-center justify-center">
              Carregando Mapa...
            </div>
          </div>
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <PropertyList filters={filters} />
        </Suspense>
      )}
    </div>
  );
}
