'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

// Cabo Verde center (Santiago - Praia)
const DEFAULT_CENTER: [number, number] = [14.9167, -23.5167];
const DEFAULT_ZOOM = 8;

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), {
  ssr: false,
});

export interface MapMarker {
  id: string | number;
  position: [number, number];
  label?: string;
  popup?: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: string;
}

/**
 * Mapa Leaflet com estilo adequado para Cabo Verde.
 * Usa OpenStreetMap (open-source). Para mais features (heatmaps, estilos custom)
 * pode trocar para Mapbox GL JS com token.
 */
export function MapView({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  className = '',
  height = '400px',
}: MapViewProps) {
  const style = useMemo(() => ({ height, width: '100%' }), [height]);

  return (
    <div className={className} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={style}
        scrollWheelZoom
        className="rounded-lg z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position}>
            {m.popup && <Popup>{m.popup}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
