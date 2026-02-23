import { Suspense } from 'react';
import type { Metadata } from 'next';
import PropertyList from '@/components/properties/PropertyList';
import SearchFilters from '@/components/properties/SearchFilters';
import { IslandExploreSection } from '@/components/properties/IslandExploreSection';
import { SkeletonCard } from '@/components/common/Skeleton';
import type { PropertyFilters } from '@/lib/api/properties';

export const metadata: Metadata = {
  title: 'Novas Construções & Empreendimentos em Cabo Verde – imo.cv',
  description:
    'Descobre novos empreendimentos e imóveis em construção em Cabo Verde. Compra na planta e investe em zonas de alto crescimento.',
};

export default async function ObrasNovasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filters: PropertyFilters = {
    listing_type: 'new_construction',
    page: params.page ? Number(params.page) : 1,
    limit: 24,
    island: params.island as string,
    property_type: params.property_type as string,
    price_min: Number(params.price_min) || undefined,
    price_max: Number(params.price_max) || undefined,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #b45309 0%, #7c3c0a 100%)' }}
      >
        {/* Dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            🏗️ Novas Construções
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Novas Construções em Cabo Verde
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Empreendimentos e imóveis em construção. Compra na planta, personaliza
            e investe nas zonas de maior crescimento do arquipélago.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Santiago', 'Sal', 'Boa Vista', 'São Vicente'].map((island) => (
              <a
                key={island}
                href={`/obras-novas?island=${encodeURIComponent(island)}`}
                className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {island}
              </a>
            ))}
          </div>
          {/* Quick stats */}
          <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-6 text-center">
            {[
              { value: '+42', label: 'Empreendimentos' },
              { value: 'T1→T4', label: 'Tipologias' },
              { value: '+18%', label: 'Valorização/ano' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Islands – Stitch-style grid */}
      <IslandExploreSection
        basePath="/obras-novas"
        title="Explora as ilhas"
        subtitle="Novos empreendimentos e oportunidades de investimento por ilha."
      />

      {/* Listings */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <SearchFilters filters={filters} />
        <Suspense
          fallback={
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <PropertyList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}
