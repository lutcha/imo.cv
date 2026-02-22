import apiClient from './client';
import type { Lead, PaginatedResponse } from '@/types';

export const leadsApi = {
  list: async (params?: {
    stage?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Lead>> => {
    const { data } = await apiClient.get<PaginatedResponse<Lead>>('/leads/', {
      params,
    });
    return data;
  },

  getById: async (id: string): Promise<Lead> => {
    const { data } = await apiClient.get<Lead>(`/leads/${id}/`);
    return data;
  },

  update: async (id: string, payload: Partial<Lead>): Promise<Lead> => {
    const { data } = await apiClient.patch<Lead>(`/leads/${id}/`, payload);
    return data;
  },

  create: async (payload: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> => {
    const { data } = await apiClient.post<Lead>('/leads/', payload);
    return data;
  },
};
