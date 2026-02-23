import apiClient from './client';

export interface PlatformStats {
  total_agents: number;
  pending_verifications: number;
  total_properties: number;
  total_condominiums: number;
  active_leads: number;
  monthly_new_agents: number;
}

export interface AgentRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  agency_name: string | null;
  is_verified: boolean;
  date_joined: string;
  total_properties: number;
}

export interface PlatformSettings {
  site_name: string;
  contact_email: string;
  whatsapp_default: string;
  maintenance_mode: boolean;
  allow_registration: boolean;
  featured_limit: number;
}

export const adminApi = {
  getStats: async (): Promise<PlatformStats> => {
    const { data } = await apiClient.get<PlatformStats>('/admin/stats/');
    return data;
  },

  listAgents: async (params?: {
    page?: number;
    verified?: boolean;
    search?: string;
  }): Promise<{ results: AgentRecord[]; count: number }> => {
    const { data } = await apiClient.get('/admin/agents/', { params });
    return data;
  },

  verifyAgent: async (
    agentId: string,
    verified: boolean
  ): Promise<AgentRecord> => {
    const { data } = await apiClient.patch(`/admin/agents/${agentId}/`, {
      is_verified: verified,
    });
    return data;
  },

  getSettings: async (): Promise<PlatformSettings> => {
    const { data } = await apiClient.get<PlatformSettings>('/admin/settings/');
    return data;
  },

  updateSettings: async (
    settings: Partial<PlatformSettings>
  ): Promise<PlatformSettings> => {
    const { data } = await apiClient.patch<PlatformSettings>(
      '/admin/settings/',
      settings
    );
    return data;
  },
};
