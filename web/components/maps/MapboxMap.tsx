'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { mapboxConfig } from '@/config/mapbox';
import type { PropertyListItem } from '@/types/property';
import { SkeletonMap } from '@/components/common/Skeleton';
import { formatPrice } from '@/lib/utils/formatters';

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

function buildPopupHtml(p: PropertyListItem): string {
  const seed = parseInt(p.id.replace(/-/g, '').slice(0, 8), 16) % 1000;
  const imgSrc = `https://picsum.photos/seed/${seed}/280/180`;
  const price = p.price != null ? formatPrice(p.price, p.currency) : 'Sob consulta';
  const areaHtml = p.area_util
    ? `<p style="margin:0 0 6px;font-size:11px;color:#6b7280;">&#128208; ${p.area_util}&nbsp;m&sup2;</p>`
    : '';
  return (
    `<div style="min-width:200px;max-width:240px;font-family:system-ui,sans-serif;overflow:hidden;border-radius:8px;">` +
    `<img src="${imgSrc}" alt="${p.title}" style="width:100%;height:100px;object-fit:cover;display:block;" />` +
    `<div style="padding:10px 12px 12px;">` +
    `<span style="display:inline-block;font-size:10px;background:#f0fdfa;color:#0d9488;padding:2px 8px;border-radius:999px;font-weight:600;margin-bottom:4px;">${p.property_type_display}</span>` +
    `<p style="margin:0 0 2px;font-weight:700;font-size:13px;line-height:1.3;color:#111827;">${p.title}</p>` +
    `<p style="margin:0 0 6px;font-weight:700;font-size:15px;color:#0d9488;">${price}</p>` +
    areaHtml +
    `<a href="/property/${p.id}" style="display:inline-block;font-size:12px;color:#fff;background:#0d9488;padding:5px 14px;border-radius:6px;text-decoration:none;font-weight:600;">Ver detalhes &#8594;</a>` +
    `</div></div>`
  );
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
          popup: buildPopupHtml(p),
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
