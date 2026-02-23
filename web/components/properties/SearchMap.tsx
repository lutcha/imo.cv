import { propertiesApi } from '@/lib/api/properties';
import type { PropertyFilters } from '@/lib/api/properties';
import { MapboxMap } from '@/components/maps/MapboxMap';

export default async function SearchMap({ filters }: { filters: PropertyFilters }) {
  let properties: any[] = [];
  try {
    const data = await propertiesApi.search({ ...filters, limit: 200 });
    properties = data.results.filter((p: any) => p.location_geojson?.coordinates);
  } catch {
    // silently fall back to empty map
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <MapboxMap properties={properties} height="600px" />
    </div>
  );
}
