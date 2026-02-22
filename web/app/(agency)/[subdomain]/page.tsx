// app/(agency)/[subdomain]/page.tsx
import { notFound } from 'next/navigation';
import PropertyList from '@/components/properties/PropertyList';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/common/Skeleton';

// Assume we have an API to fetch agency info by subdomain
// For now, we'll just show the agency name and its properties

export default async function AgencyPage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;

    // In a real scenario, we'd fetch agency details here
    // const agency = await agenciesApi.getBySubdomain(subdomain);
    // if (!agency) return notFound();

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
                    {subdomain.replace('-', ' ')}
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                    Bem-vindo à nossa montra exclusiva de imóveis.
                </p>
            </header>

            <section>
                <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
                    Os nossos Imóveis
                </h2>

                <Suspense fallback={
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                }>
                    {/* We naturally filter by agency based on the subdomain context at the API/Backend level */}
                    <PropertyList filters={{ page: 1, limit: 12 }} />
                </Suspense>
            </section>
        </div>
    );
}
