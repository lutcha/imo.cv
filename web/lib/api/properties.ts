import apiClient, { ssrGet } from './client';
import type {
  PropertyDetail,
  PropertyListItem,
  PaginatedResponse,
} from '@/types/property';

export interface PropertyFilters {
  island?: string;
  municipality?: string;
  listing_type?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  price_min?: number;
  price_max?: number;
  min_area?: number;
  max_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  lat?: number;
  lon?: number;
  radius_km?: number;
  bbox?: string;
  page?: number;
  limit?: number;
}

export const propertiesApi = {
  search: async (
    filters: PropertyFilters
  ): Promise<PaginatedResponse<PropertyListItem>> => {
    const params: Record<string, string | number | undefined> = {
      ...filters,
      price_min: filters.price_min ?? filters.min_price,
      price_max: filters.price_max ?? filters.max_price,
    };
    delete params.min_price;
    delete params.max_price;

    // Server: use native fetch to avoid axios's url.parse() (DEP0169)
    if (typeof window === 'undefined') {
      return ssrGet<PaginatedResponse<PropertyListItem>>('/properties/', params);
    }
    const { data } = await apiClient.get<PaginatedResponse<PropertyListItem>>(
      '/properties/',
      { params }
    );
    return data;
  },

  list: async (
    filters?: PropertyFilters
  ): Promise<PaginatedResponse<PropertyListItem>> => {
    if (typeof window === 'undefined') {
      return ssrGet<PaginatedResponse<PropertyListItem>>(
        '/properties/',
        filters as Record<string, string | number | undefined>
      );
    }
    const { data } = await apiClient.get<PaginatedResponse<PropertyListItem>>(
      '/properties/',
      { params: filters }
    );
    return data;
  },

  getById: async (id: string): Promise<PropertyDetail> => {
    if (typeof window === 'undefined') {
      return ssrGet<PropertyDetail>(`/properties/${id}/`);
    }
    const { data } = await apiClient.get<PropertyDetail>(`/properties/${id}/`);
    return data;
  },

  /** Create property with JSON body (GeoJSON Feature). Use for register flow. */
  createWithGeoJson: async (payload: {
    type: 'Feature';
    geometry: { type: 'Point'; coordinates: [number, number] };
    properties: Record<string, unknown>;
  }): Promise<PropertyDetail & { id?: string }> => {
    const { data } = await apiClient.post<PropertyDetail & { id?: string }>(
      '/properties/',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  },

  create: async (formData: FormData): Promise<PropertyDetail> => {
    const { data } = await apiClient.post<PropertyDetail>(
      '/properties/',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  },

  update: async (
    id: string,
    formData: FormData
  ): Promise<PropertyDetail> => {
    const { data } = await apiClient.put<PropertyDetail>(
      `/properties/${id}/`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/properties/${id}/`);
  },
};
