'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';
import { condominiumsApi } from '@/lib/api/condominiums';
import type { FeeStatus, Unit } from '@/types/condominium';

type DisplayCurrency = 'CVE' | 'EUR' | 'USD';

interface FeeTrackerProps {
    condominiumId: string;
}

interface FeeRecord {
    id: string;
    unit: string;
    owner: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
}

const STATUS_MAP: Record<FeeStatus, FeeRecord['status']> = {
    PAID: 'paid',
    PENDING: 'pending',
    OVERDUE: 'overdue',
};

const MONTH_NAMES: Record<string, string> = {
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
    '05': 'Maio',
    '06': 'Junho',
    '07': 'Julho',
    '08': 'Agosto',
    '09': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro',
};

function formatPeriod(period: string): string {
    // period is "YYYY-MM"
    const [year, month] = period.split('-');
    return `${MONTH_NAMES[month] ?? month} ${year}`;
}

export function FeeTracker({ condominiumId }: FeeTrackerProps) {
    const [currency, setCurrency] = useState<DisplayCurrency>('CVE');

    const { data: feesData, isLoading: feesLoading } = useQuery({
        queryKey: ['fees', condominiumId],
        queryFn: () => condominiumsApi.listFees(condominiumId),
    });

    const { data: unitsData } = useQuery({
        queryKey: ['units', condominiumId],
        queryFn: () => condominiumsApi.listUnits(condominiumId),
    });

    const { data: rates } = useQuery({
        queryKey: ['exchange-rates'],
        queryFn: () => condominiumsApi.getExchangeRates(),
        staleTime: 60 * 60 * 1000, // 1 hour — matches server cache
    });

    const unitsMap = useMemo(() => {
        const map = new Map<string, Unit>();
        unitsData?.results.forEach(u => map.set(u.id, u));
        return map;
    }, [unitsData]);

    const fees: FeeRecord[] = useMemo(() => {
        if (!feesData?.results) return [];
        return feesData.results.map(fee => {
            const unit = fee.unit ? unitsMap.get(fee.unit) : null;
            return {
                id: fee.id,
                unit: unit?.identifier ?? (fee.unit ? fee.unit : 'Comum'),
                owner: unit?.owner_name ?? '',
                amount: parseFloat(fee.amount),
                dueDate: fee.due_date,
                status: STATUS_MAP[fee.status],
            };
        });
    }, [feesData, unitsMap]);

    const currentPeriod = feesData?.results[0]?.period ?? new Date().toISOString().slice(0, 7);

    const convertAmount = (cveAmount: number): string => {
        if (currency === 'CVE' || !rates) {
            return formatPrice(cveAmount);
        }
        const rate = rates[currency];
        const converted = cveAmount * rate;
        return converted.toLocaleString('pt-PT', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) + ' ' + currency;
    };

    const stats = {
        total: fees.length,
        paid: fees.filter(f => f.status === 'paid').length,
        pending: fees.filter(f => f.status === 'pending').length,
        overdue: fees.filter(f => f.status === 'overdue').length,
        revenue: fees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0),
    };

    if (feesLoading) {
        return (
            <div className="space-y-6">
                {/* Stats skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="glass rounded-2xl p-4 border-none shadow-sm dark:bg-gray-800/50">
                            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                            <div className="mt-2 h-8 w-12 rounded bg-gray-200 animate-pulse" />
                        </div>
                    ))}
                </div>

                {/* Table skeleton */}
                <div className="glass rounded-3xl border-none shadow-premium overflow-hidden dark:bg-gray-900/40">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />
                        <div className="flex gap-2">
                            <div className="h-8 w-28 rounded-xl bg-gray-200 animate-pulse" />
                            <div className="h-8 w-28 rounded-xl bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/20 text-xs font-bold text-gray-400 uppercase tracking-tight">
                                    <th className="px-6 py-4">Unidade</th>
                                    <th className="px-6 py-4">Proprietário</th>
                                    <th className="px-6 py-4 text-right">Valor</th>
                                    <th className="px-6 py-4">Vencimento</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <tr key={i}>
                                        <td className="px-6 py-4" colSpan={6}>
                                            <div className="h-10 rounded bg-gray-100 animate-pulse" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Unidades', value: stats.total, color: 'text-gray-900' },
                    { label: 'Pagos', value: stats.paid, color: 'text-hope-green-600', sub: convertAmount(stats.revenue) },
                    { label: 'Pendentes', value: stats.pending, color: 'text-dream-gold-600' },
                    { label: 'Em Atraso', value: stats.overdue, color: 'text-danger' },
                ].map((item) => (
                    <div key={item.label} className="glass rounded-2xl p-4 border-none shadow-sm dark:bg-gray-800/50">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
                        <p className={cn("mt-1 text-2xl font-bold", item.color)}>{item.value}</p>
                        {item.sub && <p className="mt-1 text-xs text-gray-400 font-medium">{item.sub}</p>}
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div className="glass rounded-3xl border-none shadow-premium overflow-hidden dark:bg-gray-900/40">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                        Pagamentos - {formatPeriod(currentPeriod)}
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* Currency selector */}
                        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-semibold">
                            {(['CVE', 'EUR', 'USD'] as DisplayCurrency[]).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCurrency(c)}
                                    className={cn(
                                        'px-3 py-1.5 transition-colors',
                                        currency === c
                                            ? 'bg-trust-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                    )}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl">Exportar PDF</Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/20 text-xs font-bold text-gray-400 uppercase tracking-tight">
                                <th className="px-6 py-4">Unidade</th>
                                <th className="px-6 py-4">Proprietário</th>
                                <th className="px-6 py-4 text-right">Valor</th>
                                <th className="px-6 py-4">Vencimento</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {fees.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Nenhuma quota registada para este período.
                                    </td>
                                </tr>
                            ) : (
                                fees.map((fee) => (
                                    <tr key={fee.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-200">{fee.unit}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{fee.owner}</td>
                                        <td className="px-6 py-4 text-sm text-right font-semibold">{convertAmount(fee.amount)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{fee.dueDate}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={fee.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Ver detalhes"
                                            >
                                                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: FeeRecord['status'] }) {
    const configs = {
        paid: { label: 'Pago', icon: CheckCircleIcon, bg: 'bg-hope-green-50 text-hope-green-600 dark:bg-hope-green-900/20' },
        pending: { label: 'Pendente', icon: ClockIcon, bg: 'bg-dream-gold-50 text-dream-gold-600 dark:bg-dream-gold-900/20' },
        overdue: { label: 'Em Atraso', icon: ExclamationCircleIcon, bg: 'bg-red-50 text-danger dark:bg-red-900/20' },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold", config.bg)}>
            <Icon className="h-3.5 w-3.5" />
            {config.label}
        </span>
    );
}
