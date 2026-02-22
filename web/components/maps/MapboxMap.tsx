'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { mapboxConfig } from '@/config/mapbox';
import type { PropertyListItem } from '@/types/property';
import { SkeletonMap } from '@/components/common/Skeleton';

const MapView = dynamic(
  () => import('@/components/map/MapView').then((m) => m.MapView),
  {
    ssr: false,
    loading: () => <SkeletonMap className="min-h-[400px]" />,
  }
);

export interface MapboxMapProps {
  properties: PropertyListItem[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
  showHeatmap?: boolean;
  onPropertyClick?: (property: PropertyListItem) => void;
  onAreaSelect?: (bounds: unknown) => void;
  className?: string;
  height?: string;
}

/**
 * Map component that displays properties. Uses Leaflet (MapView) by default.
 * Set NEXT_PUBLIC_MAPBOX_TOKEN to use Mapbox GL JS when implemented.
 */
export function MapboxMap({
  properties,
  center = mapboxConfig.defaultCenter,
  zoom = mapboxConfig.defaultZoom,
  interactive = true,
  showHeatmap = false,
  onPropertyClick,
  className,
  height = '500px',
}: MapboxMapProps) {
  const markers = useMemo(() => {
    return properties
      .filter((p) => p.location_geojson?.coordinates)
      .map((p) => {
        const [lon, lat] = p.location_geojson!.coordinates;
        return {
          id: p.id,
          position: [lat, lon] as [number, number],
          label: p.title,
          popup: `${p.title} – ${p.price != null ? `${p.price} ${p.currency}` : 'Sob consulta'}`,
        };
      });
  }, [properties]);

  return (
    <div className={className}>
      <MapView
        center={center}
        zoom={zoom}
        markers={markers}
        height={height}
        className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
}
