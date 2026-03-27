'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { condominiumsApi } from '@/lib/api/condominiums';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';
import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPeriod(period: string): string {
    const [year, month] = period.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]} ${year.slice(2)}`;
}

const PRIORITY_LABELS: Record<string, string> = {
    URGENT: 'Urgente', HIGH: 'Alta', MEDIUM: 'Média', LOW: 'Baixa',
};
const PRIORITY_COLORS: Record<string, string> = {
    URGENT: '#ef4444', HIGH: '#f97316', MEDIUM: '#eab308', LOW: '#6b7280',
};
const FEE_STATUS_LABELS: Record<string, string> = {
    PAID: 'Pago', PENDING: 'Pendente', OVERDUE: 'Em Atraso',
};
const FEE_STATUS_COLORS: Record<string, string> = {
    PAID: '#22c55e', PENDING: '#f59e0b', OVERDUE: '#ef4444',
};

// ---------------------------------------------------------------------------
// KPI Card
// ---------------------------------------------------------------------------

function KpiCard({ label, value, sub, highlight }: {
    label: string; value: string | number; sub?: string; highlight?: boolean;
}) {
    return (
        <div className={cn(
            'rounded-xl border p-5',
            highlight
                ? 'border-trust-blue-200 bg-trust-blue-50 dark:border-trust-blue-800 dark:bg-trust-blue-900/20'
                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
        )}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
            <p className={cn(
                'mt-1 text-3xl font-bold',
                highlight ? 'text-trust-blue-700 dark:text-trust-blue-300' : 'text-gray-900 dark:text-white'
            )}>{value}</p>
            {sub && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Chart card wrapper
// ---------------------------------------------------------------------------

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {title}
            </h3>
            {children}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CondominiumAnalyticsPage() {
    const params = useParams();
    const router = useRouter();
    const condominiumId = params.id as string;

    const { data: condo } = useQuery({
        queryKey: ['condominium', condominiumId],
        queryFn: () => condominiumsApi.get(condominiumId),
    });

    const { data, isLoading } = useQuery({
        queryKey: ['analytics', condominiumId],
        queryFn: () => condominiumsApi.getAnalytics(condominiumId),
        enabled: !!condominiumId,
    });

    if (isLoading || !data) {
        return (
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            </div>
        );
    }

    const { kpis, monthly_payments, fee_distribution, maintenance_by_priority, area_occupancy } = data;

    const pieData = fee_distribution.map(d => ({
        name: FEE_STATUS_LABELS[d.status] ?? d.status,
        value: d.count,
        color: FEE_STATUS_COLORS[d.status] ?? '#9ca3af',
    }));

    const barMaintenanceData = maintenance_by_priority.map(d => ({
        name: PRIORITY_LABELS[d.priority] ?? d.priority,
        count: d.count,
        fill: PRIORITY_COLORS[d.priority] ?? '#6b7280',
    }));

    const lineData = monthly_payments.map(m => ({
        ...m,
        name: formatPeriod(m.period),
    }));

    return (
        <div className="mx-auto max-w-7xl p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{condo?.name}</p>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <KpiCard
                    label="Taxa de Pagamento (mês actual)"
                    value={`${kpis.payment_rate_current}%`}
                    sub="quotas pagas / total"
                    highlight
                />
                <KpiCard
                    label="Arrecadado este mês"
                    value={`${Math.round(kpis.paid_amount_cve).toLocaleString('pt-CV')} CVE`}
                    sub={`de ${Math.round(kpis.expected_amount_cve).toLocaleString('pt-CV')} CVE esperados`}
                />
                <KpiCard
                    label="Manutenções abertas"
                    value={kpis.open_maintenance}
                    sub={`${kpis.resolved_maintenance} resolvidas este mês`}
                />
                {kpis.top_area && (
                    <KpiCard
                        label="Área mais reservada (30 dias)"
                        value={kpis.top_area}
                    />
                )}
            </div>

            {/* Charts grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* 1 — Payment rate trend */}
                <ChartCard title="Taxa de pagamento — últimos 6 meses">
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={lineData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(v: number) => [`${v}%`, 'Taxa']} />
                            <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="#1d4ed8"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#1d4ed8' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* 2 — Fee distribution pie */}
                <ChartCard title="Distribuição de pagamentos">
                    <div className="flex items-center gap-4">
                        <ResponsiveContainer width="55%" height={220}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v: number) => [v, 'Quotas']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2">
                            {pieData.map(d => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {d.name} <span className="font-bold text-gray-900 dark:text-white">{d.value}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartCard>

                {/* 3 — Maintenance by priority bar */}
                <ChartCard title="Manutenções por prioridade">
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={barMaintenanceData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="count" name="Pedidos" radius={[4, 4, 0, 0]}>
                                {barMaintenanceData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* 4 — Area occupancy bar */}
                {area_occupancy.length > 0 && (
                    <ChartCard title="Ocupação de áreas comuns (últimos 30 dias)">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart
                                data={area_occupancy}
                                layout="vertical"
                                margin={{ top: 4, right: 24, bottom: 4, left: 16 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                                <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
                                <Tooltip formatter={(v: number) => [`${v}%`, 'Ocupação']} />
                                <Bar dataKey="occupancy_pct" name="Ocupação" fill="#1d4ed8" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}
            </div>
        </div>
    );
}
