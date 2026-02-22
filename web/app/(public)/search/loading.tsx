// app/(public)/search/loading.tsx
import { SkeletonCard, SkeletonMap } from '@/components/common/Skeleton';

export default function SearchLoading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="mb-6">
                <div className="h-48 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
