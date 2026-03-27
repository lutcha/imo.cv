import apiClient from './client';
import type {
  Condominium,
  CreateCondominiumInput,
  UpdateCondominiumInput,
  Unit,
  CreateUnitInput,
  Fee,
  FeeStatus,
  CreateFeeInput,
  MaintenanceRequest,
  MaintenanceStatus,
  MaintenancePriority,
  CreateMaintenanceInput,
  Notice,
  CreateNoticeInput,
  CommonArea,
  CreateCommonAreaInput,
  Reservation,
  CreateReservationInput,
  Assembly,
  CreateAssemblyInput,
  AssemblyTopic,
  CreateAssemblyTopicInput,
  AssemblyVote,
  CastVoteInput,
  PaginatedResponse,
} from '@/types/condominium';

// ---------------------------------------------------------------------------
// Condominiums
// ---------------------------------------------------------------------------

export const condominiumsApi = {
  list: async (params?: {
    is_active?: boolean;
  }): Promise<PaginatedResponse<Condominium>> => {
    const searchParams = new URLSearchParams();
    if (params?.is_active !== undefined) {
      searchParams.set('is_active', String(params.is_active));
    }
    const query = searchParams.toString();
    const { data } = await apiClient.get<PaginatedResponse<Condominium>>(
      `/condominiums/${query ? `?${query}` : ''}`
    );
    return data;
  },

  get: async (id: string): Promise<Condominium> => {
    const { data } = await apiClient.get<Condominium>(`/condominiums/${id}/`);
    return data;
  },

  create: async (payload: CreateCondominiumInput): Promise<Condominium> => {
    const { data } = await apiClient.post<Condominium>('/condominiums/', payload);
    return data;
  },

  update: async (
    id: string,
    payload: UpdateCondominiumInput
  ): Promise<Condominium> => {
    const { data } = await apiClient.patch<Condominium>(
      `/condominiums/${id}/`,
      payload
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Units
  // ---------------------------------------------------------------------------

  listUnits: async (
    condominiumId: string
  ): Promise<PaginatedResponse<Unit>> => {
    const { data } = await apiClient.get<PaginatedResponse<Unit>>(
      `/condominiums/${condominiumId}/units/`
    );
    return data;
  },

  getUnit: async (condominiumId: string, unitId: string): Promise<Unit> => {
    const { data } = await apiClient.get<Unit>(
      `/condominiums/${condominiumId}/units/${unitId}/`
    );
    return data;
  },

  createUnit: async (
    condominiumId: string,
    payload: CreateUnitInput
  ): Promise<Unit> => {
    const { data } = await apiClient.post<Unit>(
      `/condominiums/${condominiumId}/units/`,
      payload
    );
    return data;
  },

  updateUnit: async (
    condominiumId: string,
    unitId: string,
    payload: Partial<CreateUnitInput>
  ): Promise<Unit> => {
    const { data } = await apiClient.patch<Unit>(
      `/condominiums/${condominiumId}/units/${unitId}/`,
      payload
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Fees
  // ---------------------------------------------------------------------------

  listFees: async (
    condominiumId: string,
    filters?: {
      period?: string;
      status?: FeeStatus;
      unit_id?: string;
    }
  ): Promise<PaginatedResponse<Fee>> => {
    const searchParams = new URLSearchParams();
    if (filters?.period !== undefined) {
      searchParams.set('period', filters.period);
    }
    if (filters?.status !== undefined) {
      searchParams.set('status', filters.status);
    }
    if (filters?.unit_id !== undefined) {
      searchParams.set('unit_id', filters.unit_id);
    }
    const query = searchParams.toString();
    const { data } = await apiClient.get<PaginatedResponse<Fee>>(
      `/condominiums/${condominiumId}/fees/${query ? `?${query}` : ''}`
    );
    return data;
  },

  createFee: async (
    condominiumId: string,
    payload: CreateFeeInput
  ): Promise<Fee> => {
    const { data } = await apiClient.post<Fee>(
      `/condominiums/${condominiumId}/fees/`,
      payload
    );
    return data;
  },

  updateFeeStatus: async (
    condominiumId: string,
    feeId: string,
    status: FeeStatus
  ): Promise<Fee> => {
    const { data } = await apiClient.patch<Fee>(
      `/condominiums/${condominiumId}/fees/${feeId}/`,
      { status }
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Maintenance requests
  // ---------------------------------------------------------------------------

  listMaintenance: async (
    condominiumId: string,
    filters?: {
      status?: MaintenanceStatus;
      priority?: MaintenancePriority;
    }
  ): Promise<PaginatedResponse<MaintenanceRequest>> => {
    const searchParams = new URLSearchParams();
    if (filters?.status !== undefined) {
      searchParams.set('status', filters.status);
    }
    if (filters?.priority !== undefined) {
      searchParams.set('priority', filters.priority);
    }
    const query = searchParams.toString();
    const { data } = await apiClient.get<PaginatedResponse<MaintenanceRequest>>(
      `/condominiums/${condominiumId}/maintenance-requests/${query ? `?${query}` : ''}`
    );
    return data;
  },

  createMaintenance: async (
    condominiumId: string,
    payload: CreateMaintenanceInput
  ): Promise<MaintenanceRequest> => {
    const { data } = await apiClient.post<MaintenanceRequest>(
      `/condominiums/${condominiumId}/maintenance-requests/`,
      payload
    );
    return data;
  },

  updateMaintenance: async (
    condominiumId: string,
    id: string,
    payload: Partial<CreateMaintenanceInput>
  ): Promise<MaintenanceRequest> => {
    const { data } = await apiClient.patch<MaintenanceRequest>(
      `/condominiums/${condominiumId}/maintenance-requests/${id}/`,
      payload
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Notices
  // ---------------------------------------------------------------------------

  listNotices: async (
    condominiumId: string
  ): Promise<PaginatedResponse<Notice>> => {
    const { data } = await apiClient.get<PaginatedResponse<Notice>>(
      `/condominiums/${condominiumId}/notices/`
    );
    return data;
  },

  createNotice: async (
    condominiumId: string,
    payload: CreateNoticeInput
  ): Promise<Notice> => {
    const { data } = await apiClient.post<Notice>(
      `/condominiums/${condominiumId}/notices/`,
      payload
    );
    return data;
  },

  updateNotice: async (
    condominiumId: string,
    noticeId: string,
    payload: Partial<CreateNoticeInput>
  ): Promise<Notice> => {
    const { data } = await apiClient.patch<Notice>(
      `/condominiums/${condominiumId}/notices/${noticeId}/`,
      payload
    );
    return data;
  },

  sendNoticeWhatsApp: async (
    condominiumId: string,
    noticeId: string
  ): Promise<{ sent: number; failed: number; total: number }> => {
    const { data } = await apiClient.post(
      `/condominiums/${condominiumId}/notices/${noticeId}/send-whatsapp/`
    );
    return data;
  },

  deleteNotice: async (
    condominiumId: string,
    noticeId: string
  ): Promise<void> => {
    await apiClient.delete(`/condominiums/${condominiumId}/notices/${noticeId}/`);
  },

  // ---------------------------------------------------------------------------
  // Sprint 2-A: Common Areas
  // ---------------------------------------------------------------------------

  listCommonAreas: async (
    condominiumId: string
  ): Promise<PaginatedResponse<CommonArea>> => {
    const { data } = await apiClient.get<PaginatedResponse<CommonArea>>(
      `/condominiums/${condominiumId}/common-areas/`
    );
    return data;
  },

  createCommonArea: async (
    condominiumId: string,
    payload: CreateCommonAreaInput
  ): Promise<CommonArea> => {
    const { data } = await apiClient.post<CommonArea>(
      `/condominiums/${condominiumId}/common-areas/`,
      payload
    );
    return data;
  },

  updateCommonArea: async (
    condominiumId: string,
    commonAreaId: string,
    payload: Partial<CreateCommonAreaInput>
  ): Promise<CommonArea> => {
    const { data } = await apiClient.patch<CommonArea>(
      `/condominiums/${condominiumId}/common-areas/${commonAreaId}/`,
      payload
    );
    return data;
  },

  getCommonAreaAvailability: async (
    condominiumId: string,
    commonAreaId: string,
    date: string // YYYY-MM-DD
  ): Promise<{
    date: string;
    common_area: string;
    free_slots: { start: string; end: string }[];
    occupied_slots: {
      id: string;
      start: string;
      end: string;
      status: string;
      resident_name: string;
    }[];
  }> => {
    const { data } = await apiClient.get(
      `/condominiums/${condominiumId}/common-areas/${commonAreaId}/availability/`,
      { params: { date } }
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Sprint 2-A: Reservations
  // ---------------------------------------------------------------------------

  listReservations: async (
    condominiumId: string,
    commonAreaId: string
  ): Promise<PaginatedResponse<Reservation>> => {
    const { data } = await apiClient.get<PaginatedResponse<Reservation>>(
      `/condominiums/${condominiumId}/common-areas/${commonAreaId}/reservations/`
    );
    return data;
  },

  createReservation: async (
    condominiumId: string,
    commonAreaId: string,
    payload: CreateReservationInput
  ): Promise<Reservation> => {
    const { data } = await apiClient.post<Reservation>(
      `/condominiums/${condominiumId}/common-areas/${commonAreaId}/reservations/`,
      payload
    );
    return data;
  },

  updateReservation: async (
    condominiumId: string,
    commonAreaId: string,
    reservationId: string,
    payload: Partial<CreateReservationInput>
  ): Promise<Reservation> => {
    const { data } = await apiClient.patch<Reservation>(
      `/condominiums/${condominiumId}/common-areas/${commonAreaId}/reservations/${reservationId}/`,
      payload
    );
    return data;
  },

  cancelReservation: async (
    condominiumId: string,
    commonAreaId: string,
    reservationId: string
  ): Promise<Reservation> => {
    return condominiumsApi.updateReservation(
      condominiumId,
      commonAreaId,
      reservationId,
      { status: 'CANCELLED' }
    );
  },

  // ---------------------------------------------------------------------------
  // Analytics (S7-B)
  // ---------------------------------------------------------------------------

  getAnalytics: async (condominiumId: string): Promise<{
    kpis: {
      payment_rate_current: number;
      paid_amount_cve: number;
      expected_amount_cve: number;
      open_maintenance: number;
      resolved_maintenance: number;
      top_area: string | null;
    };
    monthly_payments: { period: string; paid: number; pending: number; overdue: number; total: number; rate: number }[];
    fee_distribution: { status: string; count: number }[];
    maintenance_by_priority: { priority: string; count: number }[];
    area_occupancy: { name: string; confirmed: number; occupancy_pct: number }[];
  }> => {
    const { data } = await apiClient.get(`/condominiums/${condominiumId}/analytics/`);
    return data;
  },

  // ---------------------------------------------------------------------------
  // Exchange Rates
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Sprint 8: Assembleia e Votação
  // ---------------------------------------------------------------------------

  listAssemblies: async (condominiumId: string): Promise<PaginatedResponse<Assembly>> => {
    const { data } = await apiClient.get<PaginatedResponse<Assembly>>(
      `/condominiums/${condominiumId}/assemblies/`
    );
    return data;
  },

  getAssembly: async (condominiumId: string, assemblyId: string): Promise<Assembly> => {
    const { data } = await apiClient.get<Assembly>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/`
    );
    return data;
  },

  createAssembly: async (condominiumId: string, payload: CreateAssemblyInput): Promise<Assembly> => {
    const { data } = await apiClient.post<Assembly>(
      `/condominiums/${condominiumId}/assemblies/`,
      payload
    );
    return data;
  },

  updateAssembly: async (condominiumId: string, assemblyId: string, payload: Partial<CreateAssemblyInput>): Promise<Assembly> => {
    const { data } = await apiClient.patch<Assembly>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/`,
      payload
    );
    return data;
  },

  openAssembly: async (condominiumId: string, assemblyId: string): Promise<Assembly> => {
    const { data } = await apiClient.post<Assembly>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/open/`
    );
    return data;
  },

  closeAssembly: async (condominiumId: string, assemblyId: string, minutes: string): Promise<Assembly> => {
    const { data } = await apiClient.post<Assembly>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/close/`,
      { minutes }
    );
    return data;
  },

  createTopic: async (condominiumId: string, assemblyId: string, payload: CreateAssemblyTopicInput): Promise<AssemblyTopic> => {
    const { data } = await apiClient.post<AssemblyTopic>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/topics/`,
      payload
    );
    return data;
  },

  deleteTopic: async (condominiumId: string, assemblyId: string, topicId: string): Promise<void> => {
    await apiClient.delete(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/topics/${topicId}/`
    );
  },

  castVote: async (condominiumId: string, assemblyId: string, topicId: string, payload: CastVoteInput): Promise<AssemblyVote> => {
    const { data } = await apiClient.post<AssemblyVote>(
      `/condominiums/${condominiumId}/assemblies/${assemblyId}/topics/${topicId}/votes/`,
      payload
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  // Exchange Rates
  // ---------------------------------------------------------------------------

  getExchangeRates: async (): Promise<{
    CVE: number;
    EUR: number;
    USD: number;
    updated_at: string;
    source: 'live' | 'fallback';
  }> => {
    const { data } = await apiClient.get('/condominiums/exchange-rates/');
    return data;
  },
};
