/** GeoJSON Point for map display */
export interface GeoJsonPoint {
  type: 'Point';
  coordinates: [number, number]; // [lon, lat]
}

export type ListingType = 'sale' | 'rent';
export type PropertyType =
  | 'apartment'
  | 'house'
  | 'land'
  | 'villa'
  | 'commercial'
  | 'other';

export type PropertyStatus = 'draft' | 'published' | 'archived';

/** Property as returned from list/search API */
export interface PropertyListItem {
  id: string;
  title: string;
  listing_type: string;
  listing_type_display: string;
  property_type: string;
  property_type_display: string;
  price: number | null;
  currency: string;
  area_util: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  island: string | null;
  address: string | null;
  location_geojson: GeoJsonPoint | null;
  featured: boolean;
  published_at: string | null;
  agency: number;
  agency_name: string;
  created_at: string;
}

/** Full property detail from GET /properties/:id/ */
export interface PropertyDetail extends PropertyListItem {
  description: string | null;
  status: PropertyStatus;
  area_bruta: number | null;
  year_built: number | null;
  concelho: string | null;
  freguesia: string | null;
  main_image: string | null;
  images: Array<{ id: string; file: string }> | null;
  updated_at: string;
}

/** For display: Property can be list or detail shape */
export type Property = PropertyListItem | PropertyDetail;

export function isPropertyDetail(p: Property): p is PropertyDetail {
  return 'description' in p && 'status' in p;
}
