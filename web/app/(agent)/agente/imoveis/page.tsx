'use client';

import Link from 'next/link';
import { usePropertiesList } from '@/lib/hooks/useProperties';
import { PropertyCard } from '@/components/common/PropertyCard';
import { SkeletonCard } from '@/components/common/Skeleton';
import { Button } from '@/components/ui/Button';

export default function AgenteImoveisPage() {
  const { data, isLoading } = usePropertiesList({ limit: 50 });
  const properties = data?.results ?? [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          Imóveis
        </h1>
        <Link href="/agente/imoveis/novo"><Button>Adicionar imóvel</Button></Link>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Listagem e CRUD. Integrar POST/PUT /api/v1/properties/ para criar/editar.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showActions={false}
              />
            ))}
      </div>
      {!isLoading && properties.length === 0 && (
        <p className="rounded-xl border border-gray-200 bg-gray-50 py-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          Ainda não tens imóveis. Adiciona o primeiro.
        </p>
      )}
    </div>
  );
}
