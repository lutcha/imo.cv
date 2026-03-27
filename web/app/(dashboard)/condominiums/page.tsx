'use client';

import type React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeeTracker } from '@/components/condominiums/FeeTracker';
import { Button } from '@/components/ui/Button';
import {
    BuildingOffice2Icon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    BellIcon
} from '@heroicons/react/24/outline';
import { condominiumsApi } from '@/lib/api/condominiums';
import type { MaintenancePriority } from '@/types/condominium';

const PRIORITY_CONFIG: Record<MaintenancePriority, { label: string; color: string }> = {
    URGENT: { label: 'Urgente', color: 'text-red-600 bg-red-50' },
    HIGH:   { label: 'Alta',    color: 'text-orange-600 bg-orange-50' },
    MEDIUM: { label: 'Médio',   color: 'text-yellow-600 bg-yellow-50' },
    LOW:    { label: 'Baixa',   color: 'text-blue-600 bg-blue-50' },
};

export default function CondominiumsPage() {
    const { data: condominiumsData, isLoading } = useQuery({
        queryKey: ['condominiums'],
        queryFn: () => condominiumsApi.list({ is_active: true }),
    });
    const condominiums = condominiumsData?.results ?? [];
    const firstCondoId = condominiums[0]?.id;

    const { data: unitsData } = useQuery({
        queryKey: ['units', firstCondoId],
        queryFn: () => condominiumsApi.listUnits(firstCondoId!),
        enabled: !!firstCondoId,
    });

    const { data: maintenanceData } = useQuery({
        queryKey: ['maintenance', firstCondoId, 'OPEN'],
        queryFn: () => condominiumsApi.listMaintenance(firstCondoId!, { status: 'OPEN' }),
        enabled: !!firstCondoId,
    });

    const openMaintenance = maintenanceData?.results ?? [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Gestão de Condomínios
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Monitoriza as tuas propriedades, quotas e manutenção num único lugar.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-none glass dark:bg-gray-800">
                        <BellIcon className="mr-2 h-5 w-5" />
                        Notificações
                    </Button>
                    <Button className="rounded-xl bg-trust-blue-600 text-white shadow-lg shadow-trust-blue-500/20">
                        Adicionar Condomínio
                    </Button>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="mb-10 grid gap-6 sm:grid-cols-3">
                {([
                    { icon: BuildingOffice2Icon, label: 'Edifícios Ativos', value: isLoading ? null : (condominiums.length > 0 ? String(condominiums.length) : '–'), color: 'bg-trust-blue-50 text-trust-blue-600' },
                    { icon: UserGroupIcon, label: 'Total Frações', value: isLoading ? null : (unitsData !== undefined ? String(unitsData.count) : '–'), color: 'bg-hope-green-50 text-hope-green-600' },
                    { icon: WrenchScrewdriverIcon, label: 'Reparações Abertas', value: isLoading ? null : (maintenanceData !== undefined ? String(maintenanceData.count) : '–'), color: 'bg-red-50 text-danger' },
                ] as { icon: React.ElementType; label: string; value: string | null; color: string }[]).map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-6 border-none dark:bg-gray-800/40">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-500">{stat.label}</p>
                        {stat.value === null ? (
                            <div className="mt-1 h-9 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        ) : (
                            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    {firstCondoId ? (
                        <FeeTracker condominiumId={firstCondoId} />
                    ) : (
                        <div className="glass rounded-3xl p-6 border-none text-sm text-gray-400">
                            Nenhum condomínio encontrado.
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Maintenance Summary */}
                    <div className="glass rounded-3xl p-6 border-none shadow-premium dark:bg-gray-900/40">
                        <h3 className="text-lg font-bold mb-4">Próximas Manutenções</h3>
                        <div className="space-y-4">
                            {isLoading ? (
                                <>
                                    <div className="h-12 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800/50" />
                                    <div className="h-12 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800/50" />
                                    <div className="h-12 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800/50" />
                                </>
                            ) : openMaintenance.length === 0 ? (
                                <p className="text-sm text-gray-400">Nenhuma manutenção aberta.</p>
                            ) : (
                                openMaintenance.slice(0, 3).map((m) => {
                                    const priority = PRIORITY_CONFIG[m.priority];
                                    const date = new Date(m.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
                                    return (
                                        <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                            <div>
                                                <p className="text-sm font-bold">{m.title}</p>
                                                <p className="text-xs text-gray-500">{date}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${priority.color}`}>
                                                {priority.label}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <Button variant="ghost" className="mt-6 w-full text-sm font-bold text-trust-blue-600">
                            Ver Todo o Calendário
                        </Button>
                    </div>

                    {/* Quick Notice Card */}
                    <div className="rounded-3xl bg-dream-gold-500 p-6 text-white shadow-xl">
                        <h3 className="text-lg font-bold mb-2">Aviso Rápido</h3>
                        <p className="text-sm text-dream-gold-100 mb-6">Envia uma mensagem urgente para todos os proprietários via App e Email.</p>
                        <Button className="w-full bg-white text-dream-gold-600 font-bold rounded-xl h-12">
                            Criar Comunicado
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
