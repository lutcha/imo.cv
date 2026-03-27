'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  WrenchScrewdriverIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ResidentData {
  unit_id: string;
  condominium_id: string;
  role: string;
  resident_name: string;
  unit_identifier: string;
}

interface DashboardData {
  unit: {
    identifier: string;
    condominium_name: string;
  };
  fees: Array<{
    id: string;
    period: string;
    amount: string;
    currency: string;
    status: string;
    due_date: string;
  }>;
  reservations: Array<{
    id: string;
    common_area_name: string;
    start_datetime: string;
    end_datetime: string;
    status: string;
  }>;
  maintenances: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    created_at: string;
  }>;
  notices: Array<{
    id: string;
    title: string;
    published_at: string | null;
  }>;
}

// ---------------------------------------------------------------------------
// API Functions
// ---------------------------------------------------------------------------

async function fetchResidentDashboard(): Promise<DashboardData> {
  const token = localStorage.getItem('resident_access_token');
  
  const response = await fetch('/api/backend/condominiums/resident/dashboard/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Não autorizado');
    }
    throw new Error('Erro ao carregar dados');
  }
  
  return response.json();
}

function logout() {
  localStorage.removeItem('resident_access_token');
  localStorage.removeItem('resident_refresh_token');
  localStorage.removeItem('resident_data');
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

const FEE_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PAID: { label: 'Pago', color: 'bg-hope-green-100 text-hope-green-700 dark:bg-hope-green-900/30' },
  PENDING: { label: 'Pendente', color: 'bg-dream-gold-100 text-dream-gold-700 dark:bg-dream-gold-900/30' },
  OVERDUE: { label: 'Em Atraso', color: 'bg-red-100 text-red-700 dark:bg-red-900/30' },
};

const RESERVATION_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: 'bg-dream-gold-100 text-dream-gold-700 dark:bg-dream-gold-900/30' },
  CONFIRMED: { label: 'Confirmada', color: 'bg-hope-green-100 text-hope-green-700 dark:bg-hope-green-900/30' },
  CANCELLED: { label: 'Cancelada', color: 'bg-red-100 text-red-700 dark:bg-red-900/30' },
  COMPLETED: { label: 'Concluída', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' },
};

const MAINTENANCE_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  OPEN: { label: 'Aberto', color: 'bg-red-100 text-red-700 dark:bg-red-900/30' },
  IN_PROGRESS: { label: 'Em Progresso', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' },
  RESOLVED: { label: 'Resolvido', color: 'bg-hope-green-100 text-hope-green-700 dark:bg-hope-green-900/30' },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  LOW: { label: 'Baixa', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
  MEDIUM: { label: 'Média', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' },
  HIGH: { label: 'Alta', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' },
  URGENT: { label: 'Urgente', color: 'bg-red-100 text-red-700 dark:bg-red-900/30' },
};

function formatCurrency(amount: string, currency: string): string {
  const value = parseFloat(amount);
  if (currency === 'CVE') {
    return `${Math.round(value).toLocaleString('pt-CV')} CVE`;
  }
  return `${value.toFixed(2)} ${currency}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ResidentDashboardPage() {
  const router = useRouter();
  const [residentData, setResidentData] = useState<ResidentData | null>(null);

  useEffect(() => {
    // Check authentication
    const data = localStorage.getItem('resident_data');
    if (!data) {
      router.push('/morador');
      return;
    }
    setResidentData(JSON.parse(data));
  }, [router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['residentDashboard'],
    queryFn: fetchResidentDashboard,
    enabled: !!residentData,
    retry: false,
  });

  const handleLogout = () => {
    logout();
    router.push('/morador');
  };

  if (!residentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">A carregar...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-20 bg-white dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
            <p className="text-red-600 dark:text-red-400">Erro ao carregar dados</p>
            <Button onClick={handleLogout} className="mt-4">
              Voltar ao Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Olá, {residentData.resident_name}!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {data?.unit?.condominium_name} • Unidade {data?.unit?.identifier}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              aria-label="Terminar sessão"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={CurrencyDollarIcon}
            label="Quotas"
            value={data?.fees.length || 0}
            color="bg-green-50 text-green-600 dark:bg-green-900/20"
          />
          <StatCard
            icon={CalendarDaysIcon}
            label="Reservas"
            value={data?.reservations.length || 0}
            color="bg-blue-50 text-blue-600 dark:bg-blue-900/20"
          />
          <StatCard
            icon={WrenchScrewdriverIcon}
            label="Manutenções"
            value={data?.maintenances.length || 0}
            color="bg-orange-50 text-orange-600 dark:bg-orange-900/20"
          />
          <StatCard
            icon={BellIcon}
            label="Avisos"
            value={data?.notices.length || 0}
            color="bg-purple-50 text-purple-600 dark:bg-purple-900/20"
          />
        </div>

        {/* Quotas Recentes */}
        <Section title="Minhas Quotas" icon={CurrencyDollarIcon}>
          {data?.fees && data.fees.length > 0 ? (
            <div className="space-y-2">
              {data.fees.map((fee) => {
                const status = FEE_STATUS_CONFIG[fee.status];
                return (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {fee.period}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Vence: {formatDate(fee.due_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(fee.amount, fee.currency)}
                      </p>
                      <span className={cn("inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold", status.color)}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="Sem quotas registadas" />
          )}
        </Section>

        {/* Próximas Reservas */}
        <Section title="Próximas Reservas" icon={CalendarDaysIcon}>
          {data?.reservations && data.reservations.length > 0 ? (
            <div className="space-y-2">
              {data.reservations.map((res) => {
                const status = RESERVATION_STATUS_CONFIG[res.status];
                const startDate = new Date(res.start_datetime);
                return (
                  <div
                    key={res.id}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {res.common_area_name}
                      </p>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", status.color)}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(startDate.toISOString())} • {startDate.getHours()}:00 - {new Date(res.end_datetime).getHours()}:00
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="Sem reservas próximas" />
          )}
        </Section>

        {/* Manutenções */}
        <Section title="Minhas Manutenções" icon={WrenchScrewdriverIcon}>
          {data?.maintenances && data.maintenances.length > 0 ? (
            <div className="space-y-2">
              {data.maintenances.map((maint) => {
                const status = MAINTENANCE_STATUS_CONFIG[maint.status];
                const priority = PRIORITY_CONFIG[maint.priority];
                return (
                  <div
                    key={maint.id}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {maint.title}
                      </p>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", status.color)}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", priority.color)}>
                        {priority.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(maint.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="Sem manutenções" />
          )}
        </Section>

        {/* Avisos */}
        <Section title="Avisos do Condomínio" icon={BellIcon}>
          {data?.notices && data.notices.length > 0 ? (
            <div className="space-y-2">
              {data.notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {notice.title}
                  </p>
                  {notice.published_at && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Publicado em {formatDate(notice.published_at)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Sem avisos" />
          )}
        </Section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className={cn("inline-flex p-2 rounded-lg", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
      {message}
    </p>
  );
}
