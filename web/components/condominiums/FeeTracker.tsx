'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';

interface FeeRecord {
    id: string;
    unit: string;
    owner: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
}

const MOCK_FEES: FeeRecord[] = [
    { id: '1', unit: 'A101', owner: 'Carlos Semedo', amount: 5500, dueDate: '2026-02-15', status: 'paid' },
    { id: '2', unit: 'B203', owner: 'Maysa Gomes', amount: 5500, dueDate: '2026-02-15', status: 'pending' },
    { id: '3', unit: 'C501', owner: 'Gilson Varela', amount: 7500, dueDate: '2025-12-15', status: 'overdue' },
    { id: '4', unit: 'D402', owner: 'Suzy Lopes', amount: 6200, dueDate: '2026-02-15', status: 'paid' },
];

export function FeeTracker() {
    const [fees, setFees] = useState<FeeRecord[]>(MOCK_FEES);

    const stats = {
        total: fees.length,
        paid: fees.filter(f => f.status === 'paid').length,
        pending: fees.filter(f => f.status === 'pending').length,
        overdue: fees.filter(f => f.status === 'overdue').length,
        revenue: fees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0)
    };

    return (
        <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Unidades', value: stats.total, color: 'text-gray-900' },
                    { label: 'Pagos', value: stats.paid, color: 'text-hope-green-600', sub: 'CVE ' + stats.revenue.toLocaleString() },
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
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-white">Pagamentos - Fevereiro 2026</h3>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">Exportar PDF</Button>
                        <Button size="sm" className="rounded-xl bg-trust-blue-600 text-white">Novo Aviso</Button>
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
                            {fees.map((fee) => (
                                <tr key={fee.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-200">{fee.unit}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{fee.owner}</td>
                                    <td className="px-6 py-4 text-sm text-right font-semibold">{formatPrice(fee.amount)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{fee.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={fee.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                        </button>
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
