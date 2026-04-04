'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  WrenchScrewdriverIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Fee {
  id: string;
  period: string;
  amount: string;
  currency: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  due_date: string;
}

interface Reservation {
  id: string;
  common_area_name: string;
  start_datetime: string;
  end_datetime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

interface Maintenance {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
}

interface Notice {
  id: string;
  title: string;
  published_at: string | null;
}

interface CommonArea {
  id: string;
  name: string;
}

interface DashboardData {
  unit: {
    identifier: string;
    condominium_name: string;
    condominium_id: string;
  };
  resident_name: string;
  fees: Fee[];
  reservations: Reservation[];
  maintenances: Maintenance[];
  notices: Notice[];
  common_areas: CommonArea[];
}

type TabId = 'quotas' | 'reservas' | 'avaria' | 'avisos';

// ---------------------------------------------------------------------------
// Status configs
// ---------------------------------------------------------------------------

const FEE_STATUS: Record<string, { label: string; rowClass: string; badgeClass: string }> = {
  PAID: {
    label: 'Pago',
    rowClass: 'bg-green-50 border border-green-200',
    badgeClass: 'bg-green-100 text-green-700',
  },
  PENDING: {
    label: 'Pendente',
    rowClass: 'bg-white border border-gray-200',
    badgeClass: 'bg-dream-gold-100 text-dream-gold-700',
  },
  OVERDUE: {
    label: 'Em Atraso',
    rowClass: 'bg-red-50 border border-red-200',
    badgeClass: 'bg-red-100 text-red-700',
  },
};

const RESERVATION_STATUS: Record<string, { label: string; badgeClass: string }> = {
  PENDING: { label: 'Pendente', badgeClass: 'bg-dream-gold-100 text-dream-gold-700' },
  CONFIRMED: { label: 'Confirmada', badgeClass: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelada', badgeClass: 'bg-red-100 text-red-700' },
  COMPLETED: { label: 'Concluída', badgeClass: 'bg-blue-100 text-blue-700' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTimePart(isoString: string): string {
  const d = new Date(isoString);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function formatCVE(amount: string): string {
  const n = parseFloat(amount);
  return formatPrice(isNaN(n) ? 0 : n, 'CVE');
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function Skeleton() {
  return (
    <div className="space-y-3 p-4">
      <div className="h-5 rounded-lg bg-gray-200 animate-pulse w-3/4" />
      <div className="h-5 rounded-lg bg-gray-200 animate-pulse w-1/2" />
      <div className="h-5 rounded-lg bg-gray-200 animate-pulse w-2/3" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      {message}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Tab: Quotas
// ---------------------------------------------------------------------------

function TabQuotas({ fees }: { fees: Fee[] }) {
  if (fees.length === 0) return <EmptyState message="Sem quotas registadas" />;

  return (
    <ul className="space-y-3">
      {fees.map((fee) => {
        const cfg = FEE_STATUS[fee.status] ?? FEE_STATUS.PENDING;
        const isPendingOrOverdue = fee.status === 'PENDING' || fee.status === 'OVERDUE';
        return (
          <li
            key={fee.id}
            className={cn('rounded-xl p-4', cfg.rowClass)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-base text-gray-900 dark:text-white truncate">
                  {fee.period}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  Vence: {formatDate(fee.due_date)}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-bold text-base text-gray-900 dark:text-white">
                  {formatCVE(fee.amount)}
                </p>
                <span
                  className={cn(
                    'mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold',
                    cfg.badgeClass
                  )}
                >
                  {cfg.label}
                </span>
              </div>
            </div>
            {isPendingOrOverdue && (
              <div className="mt-3">
                <button
                  disabled
                  title="Em breve"
                  className="w-full rounded-lg bg-primary-blue-100 text-primary-blue-400 text-sm font-semibold py-3 cursor-not-allowed select-none"
                  aria-label="Pagamento online — em breve"
                >
                  Pagar — Em breve
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Tab: Reservas
// ---------------------------------------------------------------------------

interface TabReservasProps {
  reservations: Reservation[];
  commonAreas: CommonArea[];
  condoId: string;
  token: string;
  onReserved: () => void;
}

function TabReservas({ reservations, commonAreas, condoId, token, onReserved }: TabReservasProps) {
  const [areaId, setAreaId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!areaId || !date || !startTime || !endTime) {
      setFormError('Preencha todos os campos.');
      return;
    }
    if (startTime >= endTime) {
      setFormError('A hora de fim deve ser posterior à hora de início.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/backend/condominiums/${condoId}/reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          common_area: areaId,
          start_datetime: `${date}T${startTime}:00`,
          end_datetime: `${date}T${endTime}:00`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data?.detail || data?.non_field_errors?.[0] || 'Erro ao criar reserva.');
      } else {
        setFormSuccess('Reserva criada com sucesso.');
        setAreaId('');
        setDate('');
        setStartTime('');
        setEndTime('');
        onReserved();
      }
    } catch {
      setFormError('Erro de rede. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent';

  return (
    <div className="space-y-6">
      {/* Existing reservations */}
      <section>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          As Minhas Reservas
        </h3>
        {reservations.length === 0 ? (
          <EmptyState message="Sem reservas" />
        ) : (
          <ul className="space-y-3">
            {reservations.map((r) => {
              const cfg = RESERVATION_STATUS[r.status] ?? RESERVATION_STATUS.PENDING;
              return (
                <li
                  key={r.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-base text-gray-900 dark:text-white truncate">
                      {r.common_area_name}
                    </p>
                    <span
                      className={cn(
                        'flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold',
                        cfg.badgeClass
                      )}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(r.start_datetime)} · {formatTimePart(r.start_datetime)} – {formatTimePart(r.end_datetime)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* New reservation form */}
      <section>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Nova Reserva
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="res-area" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Área Comum
            </label>
            <select
              id="res-area"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Selecione...</option>
              {commonAreas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="res-date" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Data
            </label>
            <input
              id="res-date"
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="res-start" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Início
              </label>
              <input
                id="res-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="res-end" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Fim
              </label>
              <input
                id="res-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {formError && (
            <p className="rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {formError}
            </p>
          )}
          {formSuccess && (
            <p className="rounded-lg bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-700 dark:text-green-400">
              {formSuccess}
            </p>
          )}

          <Button
            type="submit"
            isLoading={submitting}
            className="w-full py-3 text-base"
          >
            Reservar
          </Button>
        </form>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Avaria
// ---------------------------------------------------------------------------

interface TabAvariaProps {
  condoId: string;
  token: string;
}

function TabAvaria({ condoId, token }: TabAvariaProps) {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!description.trim()) {
      setFormError('Descreva a avaria.');
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('description', description.trim());
      body.append('priority', priority);
      if (photo) body.append('photo', photo);

      const res = await fetch(`/api/backend/condominiums/${condoId}/maintenance/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data?.detail || data?.non_field_errors?.[0] || 'Erro ao reportar avaria.');
      } else {
        setFormSuccess('Avaria reportada com sucesso.');
        setDescription('');
        setPriority('NORMAL');
        setPhoto(null);
        const fileInput = document.getElementById('avaria-photo') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch {
      setFormError('Erro de rede. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="avaria-desc" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Descrição da Avaria
        </label>
        <textarea
          id="avaria-desc"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o problema com o máximo de detalhe possível..."
          className={cn(inputClass, 'resize-none')}
          required
        />
      </div>

      <div>
        <label htmlFor="avaria-priority" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Prioridade
        </label>
        <select
          id="avaria-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={inputClass}
        >
          <option value="NORMAL">Normal</option>
          <option value="URGENT">Urgente</option>
        </select>
      </div>

      <div>
        <label htmlFor="avaria-photo" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Foto (opcional)
        </label>
        <input
          id="avaria-photo"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-primary-blue-700 dark:file:bg-primary-blue-900/20 dark:file:text-primary-blue-400"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Tire uma foto diretamente com a câmara ou escolha da galeria.
        </p>
      </div>

      {formError && (
        <p className="rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}
      {formSuccess && (
        <p className="rounded-lg bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          {formSuccess}
        </p>
      )}

      <Button
        type="submit"
        isLoading={submitting}
        className="w-full py-3 text-base"
      >
        Reportar Avaria
      </Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Tab: Avisos
// ---------------------------------------------------------------------------

function TabAvisos({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) return <EmptyState message="Sem avisos do condomínio" />;

  return (
    <ul className="space-y-3">
      {notices.map((notice) => (
        <li
          key={notice.id}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <p className="font-semibold text-base text-gray-900 dark:text-white">
            {notice.title}
          </p>
          {notice.published_at && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formatDate(notice.published_at)}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Tab bar definition
// ---------------------------------------------------------------------------

const TABS: { id: TabId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'quotas', label: 'Quotas', Icon: CurrencyDollarIcon },
  { id: 'reservas', label: 'Reservas', Icon: CalendarDaysIcon },
  { id: 'avaria', label: 'Avaria', Icon: WrenchScrewdriverIcon },
  { id: 'avisos', label: 'Avisos', Icon: BellIcon },
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ResidentDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('quotas');

  // Verify token and fetch dashboard data
  useEffect(() => {
    const stored = localStorage.getItem('resident_access_token');
    if (!stored) {
      router.push('/morador');
      return;
    }
    setToken(stored);

    async function load(t: string) {
      setLoading(true);
      setFetchError('');
      try {
        const res = await fetch('/api/backend/condominiums/resident/dashboard/', {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.status === 401) {
          localStorage.removeItem('resident_access_token');
          router.push('/morador');
          return;
        }
        if (!res.ok) throw new Error('Erro ao carregar dados');
        const json: DashboardData = await res.json();
        setData(json);
      } catch (err: unknown) {
        setFetchError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    load(stored);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('resident_access_token');
    router.push('/morador');
  };

  // Reload dashboard after a successful reservation
  const reloadData = () => {
    if (!token) return;
    setLoading(true);
    fetch('/api/backend/condominiums/resident/dashboard/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: DashboardData) => setData(json))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // Waiting for localStorage check
  if (token === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <p className="mb-4 text-center text-base text-red-600 dark:text-red-400">{fetchError}</p>
        <Button onClick={handleLogout} variant="outline">
          Voltar ao Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 pb-[env(safe-area-inset-bottom)]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                               */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-20 bg-primary-blue-800 text-white shadow-md">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
              <BuildingOffice2Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              {loading || !data ? (
                <div className="space-y-1.5">
                  <div className="h-4 w-40 animate-pulse rounded bg-white/20" />
                  <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
                </div>
              ) : (
                <>
                  <p className="truncate text-base font-bold leading-tight">
                    {data.unit.condominium_name}
                  </p>
                  <p className="truncate text-sm text-white/70 leading-tight">
                    Frac. {data.unit.identifier} · {data.resident_name}
                  </p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Terminar sessão"
            className="ml-3 flex-shrink-0 rounded-lg p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white active:bg-white/20"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-t border-white/10">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-selected={isActive}
                role="tab"
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 px-1 py-3 text-xs font-semibold transition-colors',
                  isActive
                    ? 'border-b-2 border-dream-gold-400 text-white'
                    : 'text-white/60 hover:text-white/90'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Tab content                                                          */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 px-4 py-5" role="tabpanel">
        {loading || !data ? (
          <Skeleton />
        ) : (
          <>
            {activeTab === 'quotas' && <TabQuotas fees={data.fees} />}

            {activeTab === 'reservas' && (
              <TabReservas
                reservations={data.reservations}
                commonAreas={data.common_areas}
                condoId={data.unit.condominium_id}
                token={token}
                onReserved={reloadData}
              />
            )}

            {activeTab === 'avaria' && (
              <TabAvaria
                condoId={data.unit.condominium_id}
                token={token}
              />
            )}

            {activeTab === 'avisos' && (
              <TabAvisos notices={data.notices.slice(0, 20)} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
