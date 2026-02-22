'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesApi, type PropertyFilters } from '@/lib/api/properties';
import type { PropertyDetail } from '@/types/property';

export function usePropertiesSearch(filters: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', 'search', filters],
    queryFn: () => propertiesApi.search(filters),
    enabled: true,
  });
}

export function useProperty(id: string | null) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesApi.getById(id!),
    enabled: !!id,
  });
}

export function usePropertiesList(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', 'list', filters],
    queryFn: () => propertiesApi.list(filters),
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => propertiesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => propertiesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}
