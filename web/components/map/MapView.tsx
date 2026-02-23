'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/helpers';

interface MarkerData {
  id: string;
  position: [number, number];
  label: string;
  popup?: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  height?: string;
  className?: string;
}

export function MapView({
  center = [16.0, -24.0],
  zoom = 8,
  markers = [],
  height = '400px',
  className,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // In React StrictMode effects run twice. Use a cancellation flag so that
    // if the cleanup fires before the async import resolves, the second
    // invocation won't try to initialise an already-removed container.
    let cancelled = false;

    // Dynamically import Leaflet (client-only)
    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      // Fix default icon paths broken by Webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center,
        zoom,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add initial markers
      markers.forEach((m) => {
        const marker = L.marker(m.position).addTo(map);
        if (m.popup) marker.bindPopup(m.popup, { maxWidth: 260 });
        markersRef.current.push(marker);
      });
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when they change
  useEffect(() => {
    if (!mapRef.current) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      markers.forEach((m) => {
        const marker = L.marker(m.position).addTo(mapRef.current);
        if (m.popup) marker.bindPopup(m.popup);
        markersRef.current.push(marker);
      });
      if (markers.length > 0) {
        const group = L.featureGroup(markersRef.current);
        mapRef.current.fitBounds(group.getBounds().pad(0.2));
      }
    });
  }, [markers]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div
        ref={containerRef}
        style={{ height }}
        className={cn('z-0 w-full', className)}
      />
    </>
  );
}
