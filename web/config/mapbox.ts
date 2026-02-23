// Cape Verde center coordinates
export const mapboxConfig = {
  defaultCenter: [16.0, -24.0] as [number, number],
  defaultZoom: 8,
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
};
