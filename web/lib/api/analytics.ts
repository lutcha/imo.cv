import apiClient from './client';

export interface DashboardStats {
  total_properties: number;
  active_leads: number;
  closed_deals_month: number;
  revenue_month: number;
}

export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>('/analytics/dashboard/');
    return data;
  },
};
