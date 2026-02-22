'use client';

import { cn } from '@/lib/utils/helpers';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-gray-700', className)}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonMap({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn('w-full rounded-xl', className)}
      style={{ height: 400 }}
    />
  );
}
