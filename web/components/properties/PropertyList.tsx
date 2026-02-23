// components/properties/PropertyList.tsx
import { Suspense } from 'react';
import { propertiesApi, PropertyFilters } from '@/lib/api/properties';
import { PropertyCard } from '@/components/common/PropertyCard';
import { SkeletonCard } from '@/components/common/Skeleton';

// Server Component
export default async function PropertyList({
    filters,
}: {
    filters: PropertyFilters;
}) {
    try {
        // Busca assíncrona no servidor
        const data = await propertiesApi.search(filters);
        const properties = data.results;

        if (properties.length === 0) {
            return (
                <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center dark:border-gray-700 dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                        Nenhum imóvel encontrado com os filtros selecionados.
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property: any, index: number) => (
                    <Suspense
                        key={property.id}
                        fallback={<SkeletonCard />}
                    >
                        <PropertyCard property={property} priority={index === 0} />
                    </Suspense>
                ))}
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 py-8 text-center text-red-600">
                Erro ao carregar imóveis. Por favor, tente novamente.
            </div>
        );
    }
}
