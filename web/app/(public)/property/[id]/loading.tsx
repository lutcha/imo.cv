// app/(public)/property/[id]/loading.tsx
import { Skeleton } from '@/components/common/Skeleton';

export default function PropertyLoading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="mb-6 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <div className="mt-6 space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-1/3 mb-6" />
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
