import apiClient from './client';

export interface DashboardStats {
  total_properties: number;
  active_leads: number;
  active_leads_trend: 'up' | 'down' | 'neutral';
  active_leads_change: number;
  closed_deals_month: number;
  closed_deals_trend: 'up' | 'down' | 'neutral';
  closed_deals_change: number;
  revenue_month: number;
}

export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>('/analytics/dashboard/');
    return data;
  },
};
