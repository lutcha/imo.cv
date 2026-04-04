import apiClient from './client';

export interface AppNotification {
  id: number;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  action_url: string;
  created_at: string;
}

export const notificationsApi = {
  list: async (): Promise<AppNotification[]> => {
    const { data } = await apiClient.get<AppNotification[]>('/notifications/');
    return data;
  },
  markRead: async (id: number): Promise<void> => {
    await apiClient.post(`/notifications/${id}/read/`);
  },
  markAllRead: async (): Promise<void> => {
    await apiClient.post('/notifications/read-all/');
  },
};
