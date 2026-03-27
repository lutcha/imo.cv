'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CondominiumForm } from '@/components/condominiums/CondominiumForm';
import { Button } from '@/components/ui/Button';
import {
    BuildingOffice2Icon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    BellIcon,
    ChevronRightIcon,
    MapPinIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { condominiumsApi } from '@/lib/api/condominiums';
import { cn } from '@/lib/utils/helpers';
import type { Condominium } from '@/types/condominium';

const ISLAND_LABELS: Record<string, string> = {
    SANTIAGO: 'Santiago', SAL: 'Sal', BOA_VISTA: 'Boa Vista',
    SAO_VICENTE: 'São Vicente', SAO_ANTAO: 'Santo Antão',
    FOGO: 'Fogo', SAO_NICOLAU: 'São Nicolau', MAIO: 'Maio', BRAVA: 'Brava',
};

function CondominiumCard({ condo }: { condo: Condominium }) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`/agente/condominios/${condo.id}`)}
            className="group w-full text-left rounded-xl border border-gray-200 bg-white p-5 hover:border-trust-blue-300 hover:shadow-md transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:border-trust-blue-600"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trust-blue-50 dark:bg-trust-blue-900/20">
                    <BuildingOffice2Icon className="h-6 w-6 text-trust-blue-600 dark:text-trust-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-trust-blue-700 dark:group-hover:text-trust-blue-300">
                        {condo.name}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                            {ISLAND_LABELS[condo.island] ?? condo.island}
                            {condo.municipality ? ` · ${condo.municipality}` : ''}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        condo.is_active
                            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    )}>
                        {condo.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-gray-300 group-hover:text-trust-blue-500 transition-colors dark:text-gray-600" />
                </div>
            </div>
        </button>
    );
}

export default function CondominiosPage() {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

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

    const totalUnits = condominiums.reduce((acc, _) => acc, unitsData?.count ?? 0);
    const openMaintenance = maintenanceData?.count ?? 0;

    const stats = [
        {
            icon: BuildingOffice2Icon,
            label: 'Edifícios Ativos',
            value: isLoading ? null : String(condominiums.length),
            color: 'bg-trust-blue-50 text-trust-blue-600 dark:bg-trust-blue-900/20',
        },
        {
            icon: UserGroupIcon,
            label: 'Total Frações',
            value: isLoading ? null : (unitsData !== undefined ? String(unitsData.count) : '–'),
            color: 'bg-green-50 text-green-600 dark:bg-green-900/20',
        },
        {
            icon: WrenchScrewdriverIcon,
            label: 'Reparações Abertas',
            value: isLoading ? null : String(openMaintenance),
            color: 'bg-red-50 text-red-600 dark:bg-red-900/20',
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Gestão de Condomínios
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Monitoriza propriedades, quotas e manutenção num único lugar.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <BellIcon className="mr-2 h-4 w-4" />
                        Notificações
                    </Button>
                    <Button onClick={() => setShowForm(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Adicionar Condomínio
                    </Button>
                </div>
            </div>

            {/* KPI row */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', stat.color)}>
                            <stat.icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                        {stat.value === null ? (
                            <div className="mt-1 h-8 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        ) : (
                            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Condominium cards grid */}
            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            ) : condominiums.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 dark:border-gray-700">
                    <BuildingOffice2Icon className="h-14 w-14 text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nenhum condomínio registado</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">Clique em "Adicionar Condomínio" para começar</p>
                    <Button size="sm" onClick={() => setShowForm(true)}>
                        <PlusIcon className="mr-1.5 h-4 w-4" />
                        Adicionar Condomínio
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {condominiums.map(condo => (
                        <CondominiumCard key={condo.id} condo={condo} />
                    ))}
                </div>
            )}

            {showForm && (
                <CondominiumForm
                    onSuccess={() => setShowForm(false)}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
