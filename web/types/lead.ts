/** Backend status values (Lead model) */
export type LeadStatusBackend =
  | 'NOVO'
  | 'CONTACTADO'
  | 'QUALIFICADO'
  | 'VISITA_AGENDADA'
  | 'PROPOSTA_FEITA'
  | 'NEGOCIO_FECHADO'
  | 'PERDIDO';

export type LeadPriorityBackend = 'BAIXA' | 'MEDIA' | 'ALTA';

/** Frontend display stage (maps to backend status) */
export type LeadStage =
  | 'new'
  | 'contacted'
  | 'visit_scheduled'
  | 'proposal_sent'
  | 'closed_won'
  | 'closed_lost';

/** Backend API shape */
export interface Lead {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  status: LeadStatusBackend;
  priority: LeadPriorityBackend;
  property: number | null;
  property_title?: string;
  assigned_to: number | null;
  assigned_to_name?: string;
  notes: string;
  source: string;
  created_at: string;
}

/** Map backend status to display stage for Kanban columns */
export const LEAD_STATUS_TO_STAGE: Record<LeadStatusBackend, LeadStage> = {
  NOVO: 'new',
  CONTACTADO: 'contacted',
  QUALIFICADO: 'contacted',
  VISITA_AGENDADA: 'visit_scheduled',
  PROPOSTA_FEITA: 'proposal_sent',
  NEGOCIO_FECHADO: 'closed_won',
  PERDIDO: 'closed_lost',
};

export const LEAD_STAGE_TO_STATUS: Record<LeadStage, LeadStatusBackend> = {
  new: 'NOVO',
  contacted: 'CONTACTADO',
  visit_scheduled: 'VISITA_AGENDADA',
  proposal_sent: 'PROPOSTA_FEITA',
  closed_won: 'NEGOCIO_FECHADO',
  closed_lost: 'PERDIDO',
};
