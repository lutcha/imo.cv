'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { formatPrice, formatArea } from '@/lib/utils/formatters';
import type { PropertyListItem } from '@/types/property';
import { cn } from '@/lib/utils/helpers';
import { getThemedImages, getFallbackPicsum } from '@/lib/utils/propertyImages';

interface PropertyCardProps {
  property: PropertyListItem;
  variant?: 'grid' | 'list' | 'compact';
  showActions?: boolean;
  onClick?: () => void;
  /** Set for first card in list to improve LCP */
  priority?: boolean;
}

/** Uma imagem temática por tipo de imóvel ou fallback picsum. */
function getPlaceholderImage(id: string, propertyType?: string | null): string {
  const themed = getThemedImages(id, 1, propertyType);
  if (themed[0]?.startsWith('/')) return themed[0];
  return getFallbackPicsum(id, 1)[0];
}

export function PropertyCard({
  property,
  variant = 'grid',
  showActions = true,
  priority = false,
}: PropertyCardProps) {
  const href = `/property/${property.id}`;
  const imageUrl =
    (property as { main_image?: string }).main_image ||
    getPlaceholderImage(String(property.id), (property as { property_type?: string }).property_type);
  const isList = variant === 'list';
  const isCompact = variant === 'compact';

  const content = (
    <>
      <div
        className={cn(
          'relative overflow-hidden bg-gray-200 dark:bg-gray-700',
          isList ? 'h-full min-h-[180px] w-64 shrink-0' : 'aspect-[4/3]',
          isCompact && 'aspect-[4/3]'
        )}
      >
        {/* Next/Image requires width/height or fill; use img for external/placeholder for now */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
        {property.featured && (
          <span className="absolute left-2 top-2 rounded bg-primary-gold-500 px-2 py-0.5 text-xs font-medium text-white">
            Destaque
          </span>
        )}
        {showActions && (
          <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
              aria-label="Guardar"
            >
              <HeartIcon className="h-4 w-4 text-gray-700" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
              aria-label="Partilhar"
            >
              <ShareIcon className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      <div className={cn('flex flex-col p-4', isList && 'flex-1')}>
        <p className="text-xs font-medium text-imo-primary dark:text-primary-green-500">
          {property.listing_type_display} · {property.property_type_display}
        </p>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2 dark:text-white">
          {property.title}
        </h3>
        <p className="mt-1 text-lg font-semibold text-imo-primary dark:text-primary-green-600">
          {formatPrice(property.price, property.currency)}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          {property.bedrooms != null && <span>{property.bedrooms} quartos</span>}
          {property.bathrooms != null && <span>{property.bathrooms} banheiros</span>}
          {property.area_util != null && <span>{formatArea(property.area_util)}</span>}
        </div>
        {property.island && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {property.island}
            {property.address && ` · ${property.address}`}
          </p>
        )}
      </div>
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        'group block rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
        isList && 'flex flex-row'
      )}
    >
      {content}
    </Link>
  );
}
