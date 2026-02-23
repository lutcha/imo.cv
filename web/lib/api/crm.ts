import apiClient from './client';

export type CRMInteractionType =
  | 'CHAMADA'
  | 'EMAIL'
  | 'WHATSAPP'
  | 'REUNIAO'
  | 'VISITA'
  | 'OUTRO';

export interface CRMInteraction {
  id: string;
  lead: string;
  lead_name: string;
  agent: string;
  agent_name: string;
  interaction_type: CRMInteractionType;
  summary: string;
  description: string;
  interaction_date: string;
  follow_up_date: string | null;
}

export interface CreateCRMInteractionPayload {
  lead: string;
  interaction_type: CRMInteractionType;
  summary: string;
  description?: string;
  follow_up_date?: string | null;
}

export const crmApi = {
  listByLead: async (leadId: string): Promise<CRMInteraction[]> => {
    const { data } = await apiClient.get<CRMInteraction[]>('/crm/', {
      params: { lead: leadId },
    });
    return Array.isArray(data) ? data : [];
  },

  create: async (
    payload: CreateCRMInteractionPayload
  ): Promise<CRMInteraction> => {
    const { data } = await apiClient.post<CRMInteraction>('/crm/', payload);
    return data;
  },
};
