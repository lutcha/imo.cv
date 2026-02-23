// components/properties/SearchFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/common/SearchBar';
import { PropertyFilters } from '@/lib/api/properties';

export default function SearchFilters({
    filters,
}: {
    filters: PropertyFilters;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle filter changes (this could be integrated into SearchBar internally)
    const handleSearch = (newFilters: any) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });
        router.push(`/search?${params.toString()}`);
    };

    return (
        <section className="mb-6" aria-label="Filtros de pesquisa">
            <SearchBar variant="sidebar" defaultValues={filters} />
        </section>
    );
}
