// ---------------------------------------------------------------------------
// Condominium module — TypeScript types
// Mirrors Django models in src/apps/condominiums/models.py
// All fields snake_case (DRF serializer output).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Cape Verde archipelago islands */
export type Island =
  | 'SANTIAGO'
  | 'SAL'
  | 'BOA_VISTA'
  | 'SAO_VICENTE'
  | 'SAO_ANTAO'
  | 'FOGO'
  | 'SAO_NICOLAU'
  | 'MAIO'
  | 'BRAVA';

/** Supported billing currencies */
export type Currency = 'CVE' | 'EUR' | 'USD';

/** Fee payment lifecycle states */
export type FeeStatus = 'PENDING' | 'PAID' | 'OVERDUE';

/** Maintenance request resolution lifecycle */
export type MaintenanceStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

/** Operational urgency of a maintenance request */
export type MaintenancePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// ---------------------------------------------------------------------------
// Core interfaces
// ---------------------------------------------------------------------------

/** A condominium property complex managed on the platform */
export interface Condominium {
  id: string;
  name: string;
  address: string;
  island: Island;
  municipality: string;
  currency: Currency;
  /** UUID of the CONDOMINIUM_MANAGER user responsible (síndico); null if unassigned */
  manager: string | null;
  manager_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** An individual unit (apartment / fraction) within a condominium */
export interface Unit {
  id: string;
  condominium: string;
  identifier: string;
  floor: number | null;
  /** DecimalField serialised as string by DRF */
  area_m2: string | null;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  created_at: string;
  updated_at: string;
}

/** A periodic fee charged to a condominium or specific unit */
export interface Fee {
  id: string;
  condominium: string;
  /** null means the fee applies to the whole condominium */
  unit: string | null;
  /** DecimalField serialised as string by DRF */
  amount: string;
  currency: Currency;
  /** ISO date: YYYY-MM-DD */
  due_date: string;
  /** Billing period in YYYY-MM format */
  period: string;
  status: FeeStatus;
  /** ISO datetime when the fee was settled; null if unpaid */
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

/** A maintenance or repair request raised for a condominium */
export interface MaintenanceRequest {
  id: string;
  condominium: string;
  /** null if the issue affects a common area rather than a specific unit */
  unit: string | null;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  /** UUID of the resident or staff who reported the issue; null if anonymous */
  reported_by: string | null;
  // Campos de gestão da ordem de serviço (Sprint 3-A)
  assigned_to_name: string | null;
  assigned_to_phone: string | null;
  estimated_cost_cve: string | null;
  actual_cost_cve: string | null;
  resolved_at: string | null;
  resolution_notes: string | null;
  photos: string[];
  created_at: string;
  updated_at: string;
}

/** An official notice published to condominium residents */
export interface Notice {
  id: string;
  condominium: string;
  title: string;
  body: string;
  /** ISO datetime when the notice went live; null if still a draft */
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** A common area that can be reserved by residents (Sprint 2-A) */
export interface CommonArea {
  id: string;
  condominium: string;
  condominium_name?: string;
  name: string;
  capacity: number | null;
  rules: string;
  requires_payment: boolean;
  price_cve: string | null;
  is_outdoor: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** A reservation of a common area by a resident (Sprint 2-A) */
export interface Reservation {
  id: string;
  common_area: string;
  common_area_name?: string;
  unit: string;
  unit_identifier?: string;
  resident_name: string;
  resident_phone: string;
  start_datetime: string;
  end_datetime: string;
  status: ReservationStatus;
  notes: string;
  paid_amount_cve: string | null;
  created_at: string;
  updated_at: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

// ---------------------------------------------------------------------------
// Paginated API response (re-export from shared api types)
// ---------------------------------------------------------------------------

export type { PaginatedResponse } from '@/types/api';

// ---------------------------------------------------------------------------
// Form input types (React Hook Form payloads)
// ---------------------------------------------------------------------------

/** Payload for creating a new condominium */
export type CreateCondominiumInput = Omit<Condominium, 'id' | 'manager' | 'manager_name' | 'created_at' | 'updated_at'>;

/** Payload for partial updates to a condominium */
export type UpdateCondominiumInput = Partial<CreateCondominiumInput>;

/** Payload for adding a unit to a condominium (condominium FK sent via URL) */
export type CreateUnitInput = Omit<Unit, 'id' | 'condominium' | 'created_at' | 'updated_at'>;

/** Payload for creating a fee entry */
export type CreateFeeInput = Omit<Fee, 'id' | 'created_at' | 'updated_at' | 'paid_at'>;

/** Payload for filing a new maintenance request */
export type CreateMaintenanceInput = Omit<
  MaintenanceRequest,
  'id' | 'created_at' | 'updated_at' | 'reported_by' | 'condominium'
> & {
  // These fields are optional when creating a maintenance request
  assigned_to_name?: string | null;
  assigned_to_phone?: string | null;
  estimated_cost_cve?: string | null;
  actual_cost_cve?: string | null;
  resolved_at?: string | null;
  resolution_notes?: string | null;
  photos?: string[];
};

/** Payload for drafting or publishing a notice */
export type CreateNoticeInput = Omit<Notice, 'id' | 'condominium' | 'created_at' | 'updated_at'>;

/** Payload for creating a common area (Sprint 2-A) */
export type CreateCommonAreaInput = Omit<CommonArea, 'id' | 'condominium' | 'created_at' | 'updated_at' | 'condominium_name'>;

/** Payload for creating a reservation (Sprint 2-A) */
export type CreateReservationInput = Omit<Reservation, 'id' | 'common_area' | 'created_at' | 'updated_at' | 'common_area_name' | 'unit_identifier'>;

// ---------------------------------------------------------------------------
// Dropdown / select helpers
// ---------------------------------------------------------------------------

/** Options for island selects, ordered west-to-east */
export const ISLAND_OPTIONS: { value: Island; label: string }[] = [
  { value: 'SANTIAGO', label: 'Santiago' },
  { value: 'SAL', label: 'Sal' },
  { value: 'BOA_VISTA', label: 'Boa Vista' },
  { value: 'SAO_VICENTE', label: 'São Vicente' },
  { value: 'SAO_ANTAO', label: 'Santo Antão' },
  { value: 'FOGO', label: 'Fogo' },
  { value: 'SAO_NICOLAU', label: 'São Nicolau' },
  { value: 'MAIO', label: 'Maio' },
  { value: 'BRAVA', label: 'Brava' },
];

/** Options for currency selects; CVE first as it is the primary market currency */
export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: 'CVE', label: 'CVE — Escudo Cabo-Verdiano' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dólar Americano' },
];

/**
 * Options for fee status badges.
 * `color` maps to a Tailwind colour name suitable for badge backgrounds.
 */
export const FEE_STATUS_OPTIONS: {
  value: FeeStatus;
  label: string;
  color: 'green' | 'yellow' | 'red';
}[] = [
  { value: 'PENDING', label: 'Pendente', color: 'yellow' },
  { value: 'PAID', label: 'Pago', color: 'green' },
  { value: 'OVERDUE', label: 'Em Atraso', color: 'red' },
];

/** Labels for maintenance status values */
export const MAINTENANCE_STATUS_LABELS: Record<MaintenanceStatus, string> = {
  OPEN: 'Aberto',
  IN_PROGRESS: 'Em Progresso',
  RESOLVED: 'Resolvido',
};

/**
 * Options for maintenance priority selects.
 * `order` is a numeric sort key (ascending = lower impact first).
 * Mapped from real Cape Verde infrastructure impact categories:
 *   water_supply → URGENT · electricity → HIGH · security → HIGH ·
 *   elevator → MEDIUM · common_areas → MEDIUM · aesthetics → LOW
 */
export const MAINTENANCE_PRIORITY_OPTIONS: {
  value: MaintenancePriority;
  label: string;
  order: 1 | 2 | 3 | 4;
}[] = [
  { value: 'LOW', label: 'Baixa', order: 1 },
  { value: 'MEDIUM', label: 'Média', order: 2 },
  { value: 'HIGH', label: 'Alta', order: 3 },
  { value: 'URGENT', label: 'Urgente', order: 4 },
];

/** Numeric sort weight for each priority — use when sorting MaintenanceRequest[] */
export const MAINTENANCE_PRIORITY_ORDER: Record<MaintenancePriority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
};

/** Human-readable labels for each priority */
export const MAINTENANCE_PRIORITY_LABELS: Record<MaintenancePriority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

// ---------------------------------------------------------------------------
// Sprint 8: Assembleia e Votação Digital
// ---------------------------------------------------------------------------

export type AssemblyStatus = 'SCHEDULED' | 'OPEN' | 'CLOSED';
export type VoteChoice = 'YES' | 'NO' | 'ABSTAIN';

/** A condominium assembly (AG ordinária ou extraordinária) */
export interface Assembly {
  id: string;
  condominium: string;
  title: string;
  description: string;
  /** ISO datetime */
  scheduled_at: string;
  /** Minimum percentage of units for quorum (1-100) */
  quorum_pct: number;
  status: AssemblyStatus;
  /** Minutes / acta — populated after closing */
  minutes: string;
  topics: AssemblyTopic[];
  topics_count: number;
  total_units: number;
  created_at: string;
  updated_at: string;
}

/** An agenda item that may require a vote */
export interface AssemblyTopic {
  id: string;
  assembly: string;
  order: number;
  title: string;
  description: string;
  requires_vote: boolean;
  vote_yes: number;
  vote_no: number;
  vote_abstain: number;
  total_votes: number;
  /** The vote cast by the currently authenticated unit, or null */
  my_vote: VoteChoice | null;
  created_at: string;
}

/** A single unit's vote on a topic */
export interface AssemblyVote {
  id: string;
  topic: string;
  unit: string;
  unit_identifier: string;
  choice: VoteChoice;
  voted_at: string;
}

export type CreateAssemblyInput = Omit<Assembly, 'id' | 'topics' | 'topics_count' | 'total_units' | 'created_at' | 'updated_at'>;
export type CreateAssemblyTopicInput = Omit<AssemblyTopic, 'id' | 'assembly' | 'vote_yes' | 'vote_no' | 'vote_abstain' | 'total_votes' | 'my_vote' | 'created_at'>;
export type CastVoteInput = { unit: string; choice: VoteChoice };

/**
 * Options for reservation status selects (Sprint 2-A).
 * `color` maps to a Tailwind colour name for badge backgrounds.
 */
export const RESERVATION_STATUS_OPTIONS: {
  value: ReservationStatus;
  label: string;
  color: 'yellow' | 'green' | 'red' | 'blue';
}[] = [
  { value: 'PENDING', label: 'Pendente', color: 'yellow' },
  { value: 'CONFIRMED', label: 'Confirmada', color: 'green' },
  { value: 'CANCELLED', label: 'Cancelada', color: 'red' },
  { value: 'COMPLETED', label: 'Concluída', color: 'blue' },
];
