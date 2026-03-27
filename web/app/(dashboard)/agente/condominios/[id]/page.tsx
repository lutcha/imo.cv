'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FeeTracker } from '@/components/condominiums/FeeTracker';
import { MaintenanceForm } from '@/components/condominiums/MaintenanceForm';
import { ReservationCalendar } from '@/components/condominiums/ReservationCalendar';
import { NoticeForm } from '@/components/condominiums/NoticeForm';
import { condominiumsApi } from '@/lib/api/condominiums';
import { Button } from '@/components/ui/Button';
import {
    BuildingOffice2Icon,
    CurrencyDollarIcon,
    WrenchScrewdriverIcon,
    BellIcon,
    PlusIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';
import { formatPrice } from '@/lib/utils/formatters';
import type { Unit, CreateUnitInput, CommonArea, CreateCommonAreaInput, MaintenanceRequest, MaintenancePriority, MaintenanceStatus, Notice } from '@/types/condominium';

type Tab = 'units' | 'payments' | 'reservations' | 'maintenance' | 'notices';

const TAB_CONFIG: Record<Tab, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    units: { label: 'Unidades', icon: BuildingOffice2Icon },
    payments: { label: 'Pagamentos', icon: CurrencyDollarIcon },
    reservations: { label: 'Reservas', icon: CalendarDaysIcon },
    maintenance: { label: 'Manutenções', icon: WrenchScrewdriverIcon },
    notices: { label: 'Avisos', icon: BellIcon },
};

const PRIORITY_CONFIG: Record<MaintenanceRequest['priority'], { label: string; color: string }> = {
    URGENT: { label: 'Urgente', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
    HIGH: { label: 'Alta', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
    MEDIUM: { label: 'Média', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
    LOW: { label: 'Baixa', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
};

const STATUS_CONFIG: Record<MaintenanceRequest['status'], { label: string; color: string }> = {
    OPEN: { label: 'Aberto', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
    IN_PROGRESS: { label: 'Em Progresso', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
    RESOLVED: { label: 'Resolvido', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
};

export default function CondominiumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const condominiumId = params.id as string;
    const [activeTab, setActiveTab] = useState<Tab>('units');
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [editingMaintenance, setEditingMaintenance] = useState<MaintenanceRequest | undefined>(undefined);
    const [showNoticeForm, setShowNoticeForm] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | undefined>(undefined);

    const { data: condominium, isLoading: loadingCondo } = useQuery({
        queryKey: ['condominium', condominiumId],
        queryFn: () => condominiumsApi.get(condominiumId),
        enabled: !!condominiumId,
    });

    const { data: unitsData, isLoading: loadingUnits } = useQuery({
        queryKey: ['units', condominiumId],
        queryFn: () => condominiumsApi.listUnits(condominiumId),
        enabled: !!condominiumId && activeTab === 'units',
    });

    const { data: maintenanceData, isLoading: loadingMaintenance } = useQuery({
        queryKey: ['maintenance', condominiumId],
        queryFn: () => condominiumsApi.listMaintenance(condominiumId),
        enabled: !!condominiumId && activeTab === 'maintenance',
    });

    const { data: noticesData, isLoading: loadingNotices } = useQuery({
        queryKey: ['notices', condominiumId],
        queryFn: () => condominiumsApi.listNotices(condominiumId),
        enabled: !!condominiumId && activeTab === 'notices',
    });

    const units = unitsData?.results ?? [];
    const maintenanceRequests = maintenanceData?.results ?? [];
    const notices = noticesData?.results ?? [];

    const isLoading = loadingCondo || 
        (activeTab === 'units' && loadingUnits) ||
        (activeTab === 'maintenance' && loadingMaintenance) ||
        (activeTab === 'notices' && loadingNotices);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                <div className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-96 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
        );
    }

    if (!condominium) {
        return (
            <div className="mx-auto max-w-7xl p-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">Condomínio não encontrado.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Header */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {condominium.name}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{condominium.island}</span>
                            <span>•</span>
                            <span>{condominium.municipality || 'Sem município'}</span>
                            <span>•</span>
                            <span>{condominium.currency}</span>
                            {condominium.manager_name && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <UsersIcon className="h-3.5 w-3.5" />
                                        Síndico: <strong className="text-gray-700 dark:text-gray-200 ml-1">{condominium.manager_name}</strong>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => window.open(`/morador?condo=${condominiumId}`, '_blank')}
                            className="flex items-center gap-1.5 rounded-lg border border-trust-blue-200 bg-trust-blue-50 px-3 py-1.5 text-xs font-medium text-trust-blue-700 hover:bg-trust-blue-100 dark:border-trust-blue-700 dark:bg-trust-blue-900/20 dark:text-trust-blue-300"
                        >
                            <UsersIcon className="h-3.5 w-3.5" />
                            Portal Morador
                        </button>
                        <button
                            onClick={() => router.push(`/agente/condominios/${condominiumId}/assembleia`)}
                            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <UsersIcon className="h-3.5 w-3.5" />
                            Assembleias
                        </button>
                        <button
                            onClick={() => router.push(`/agente/condominios/${condominiumId}/analytics`)}
                            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <ChartBarIcon className="h-3.5 w-3.5" />
                            Analytics
                        </button>
                        <span className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-sm font-bold",
                            condominium.is_active
                                ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700"
                        )}>
                            {condominium.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex gap-4">
                    {Object.entries(TAB_CONFIG).map(([tabKey, config]) => {
                        const TabIcon = config.icon;
                        const isActive = activeTab === tabKey;
                        return (
                            <button
                                key={tabKey}
                                onClick={() => setActiveTab(tabKey as Tab)}
                                className={cn(
                                    "flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "border-trust-blue-600 text-trust-blue-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                )}
                            >
                                <TabIcon className="h-4 w-4" />
                                {config.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                {activeTab === 'units' && (
                    <UnitsTab units={units} condominiumId={condominiumId} />
                )}
                {activeTab === 'payments' && (
                    <FeeTracker condominiumId={condominiumId} />
                )}
                {activeTab === 'reservations' && (
                    <ReservationsTab condominiumId={condominiumId} />
                )}
                {activeTab === 'maintenance' && (
                    <MaintenanceTab
                        requests={maintenanceRequests}
                        condominiumId={condominiumId}
                        units={units}
                        onOpenForm={() => setShowMaintenanceForm(true)}
                        onEdit={(request) => {
                            setEditingMaintenance(request);
                            setShowMaintenanceForm(true);
                        }}
                    />
                )}
                {activeTab === 'notices' && (
                    <NoticesTab 
                        notices={notices} 
                        condominiumId={condominiumId}
                        onOpenForm={() => setShowNoticeForm(true)}
                        onEdit={(notice) => {
                            setEditingNotice(notice);
                            setShowNoticeForm(true);
                        }}
                    />
                )}
            </div>

            {/* Maintenance Form Modal */}
            {showMaintenanceForm && (
                <MaintenanceForm
                    condominiumId={condominiumId}
                    maintenanceId={editingMaintenance?.id}
                    initialData={editingMaintenance}
                    units={units}
                    onClose={() => {
                        setShowMaintenanceForm(false);
                        setEditingMaintenance(undefined);
                    }}
                />
            )}

            {/* Notice Form Modal */}
            {showNoticeForm && (
                <NoticeForm
                    condominiumId={condominiumId}
                    noticeId={editingNotice?.id}
                    initialData={editingNotice}
                    onClose={() => {
                        setShowNoticeForm(false);
                        setEditingNotice(undefined);
                    }}
                />
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Reservations Tab (includes Common Area management + Calendar)
// ---------------------------------------------------------------------------

function ReservationsTab({ condominiumId }: { condominiumId: string }) {
    const queryClient = useQueryClient();
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [areaForm, setAreaForm] = useState<Partial<CreateCommonAreaInput>>({
        name: '',
        capacity: null,
        rules: '',
        requires_payment: false,
        price_cve: null,
        is_outdoor: false,
        is_active: true,
    });

    const { data: areasData } = useQuery({
        queryKey: ['commonAreas', condominiumId],
        queryFn: () => condominiumsApi.listCommonAreas(condominiumId),
    });
    const areas = areasData?.results ?? [];

    const createAreaMutation = useMutation({
        mutationFn: (payload: CreateCommonAreaInput) =>
            condominiumsApi.createCommonArea(condominiumId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['commonAreas', condominiumId] });
            setShowAreaModal(false);
            setAreaForm({ name: '', capacity: null, rules: '', requires_payment: false, price_cve: null, is_outdoor: false, is_active: true });
        },
    });

    const handleAreaSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createAreaMutation.mutate(areaForm as CreateCommonAreaInput);
    };

    return (
        <div className="space-y-6">
            {/* Common Areas Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                        Áreas Comuns ({areas.length})
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Configure as áreas disponíveis para reserva
                    </p>
                </div>
                <Button size="sm" className="rounded-xl bg-trust-blue-600 text-white" onClick={() => setShowAreaModal(true)}>
                    <PlusIcon className="mr-1.5 h-4 w-4" />
                    Nova Área
                </Button>
            </div>

            {/* Areas chips */}
            {areas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {areas.map(area => (
                        <span
                            key={area.id}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        >
                            {area.name}
                            {area.capacity && <span className="text-gray-400">· {area.capacity} lug.</span>}
                            {area.requires_payment && area.price_cve && (
                                <span className="text-dream-gold-600 dark:text-dream-gold-400">
                                    · {parseFloat(area.price_cve).toLocaleString('pt-CV')} CVE
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            )}

            {areas.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sem áreas comuns. Clique em "Nova Área" para adicionar.
                    </p>
                </div>
            )}

            {/* Calendar */}
            {areas.length > 0 && (
                <>
                    <div className="border-t border-gray-100 dark:border-gray-700" />
                    <ReservationCalendar condominiumId={condominiumId} />
                </>
            )}

            {/* Create Common Area Modal */}
            {showAreaModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Nova Área Comum</h3>
                            <button onClick={() => setShowAreaModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAreaSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Nome *</label>
                                    <input
                                        type="text"
                                        value={areaForm.name || ''}
                                        onChange={e => setAreaForm(f => ({ ...f, name: e.target.value }))}
                                        required
                                        placeholder="Ex: Piscina, Salão de Festas"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Capacidade (lug.)</label>
                                    <input
                                        type="number"
                                        value={areaForm.capacity ?? ''}
                                        onChange={e => setAreaForm(f => ({ ...f, capacity: e.target.value ? Number(e.target.value) : null }))}
                                        placeholder="Ex: 50"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex items-end gap-4 pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={areaForm.is_outdoor || false}
                                            onChange={e => setAreaForm(f => ({ ...f, is_outdoor: e.target.checked }))}
                                            className="h-4 w-4 rounded border-gray-300 text-trust-blue-600"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Exterior</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Regras</label>
                                <textarea
                                    value={areaForm.rules || ''}
                                    onChange={e => setAreaForm(f => ({ ...f, rules: e.target.value }))}
                                    rows={2}
                                    placeholder="Regras de utilização..."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={areaForm.requires_payment || false}
                                        onChange={e => setAreaForm(f => ({ ...f, requires_payment: e.target.checked }))}
                                        className="h-4 w-4 rounded border-gray-300 text-trust-blue-600"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Requer pagamento</span>
                                </label>
                                {areaForm.requires_payment && (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={areaForm.price_cve || ''}
                                            onChange={e => setAreaForm(f => ({ ...f, price_cve: e.target.value || null }))}
                                            placeholder="Preço em CVE"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>
                            {createAreaMutation.isError && (
                                <p className="text-sm text-red-600 dark:text-red-400">Erro ao criar área. Verifique os dados.</p>
                            )}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => setShowAreaModal(false)}>Cancelar</Button>
                                <Button type="submit" disabled={createAreaMutation.isPending} className="bg-trust-blue-600 text-white hover:bg-trust-blue-700">
                                    {createAreaMutation.isPending ? 'A guardar...' : 'Guardar Área'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Units Tab
// ---------------------------------------------------------------------------

function UnitsTab({ units, condominiumId }: { units: Unit[]; condominiumId: string }) {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<Partial<CreateUnitInput>>({
        identifier: '',
        floor: null,
        area_m2: null,
        owner_name: '',
        owner_phone: '',
        owner_email: '',
    });

    const createMutation = useMutation({
        mutationFn: (payload: CreateUnitInput) =>
            condominiumsApi.createUnit(condominiumId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units', condominiumId] });
            setShowModal(false);
            setForm({ identifier: '', floor: null, area_m2: null, owner_name: '', owner_phone: '', owner_email: '' });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(form as CreateUnitInput);
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Unidades ({units.length})
                </h2>
                <Button size="sm" className="rounded-xl bg-trust-blue-600 text-white" onClick={() => setShowModal(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Adicionar Unidade
                </Button>
            </div>

            {units.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nenhuma unidade registada.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-tight">
                                <th className="pb-3">Unidade</th>
                                <th className="pb-3">Andar</th>
                                <th className="pb-3 text-right">Área</th>
                                <th className="pb-3">Proprietário</th>
                                <th className="pb-3">Telefone</th>
                                <th className="pb-3">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {units.map((unit) => (
                                <tr key={unit.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-3 font-semibold text-gray-900 dark:text-gray-200">
                                        {unit.identifier}
                                    </td>
                                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                        {unit.floor !== null ? `${unit.floor}º` : '–'}
                                    </td>
                                    <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-400">
                                        {unit.area_m2 ? `${unit.area_m2} m²` : '–'}
                                    </td>
                                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                        {unit.owner_name || '–'}
                                    </td>
                                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                        {unit.owner_phone || '–'}
                                    </td>
                                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                        {unit.owner_email || '–'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Unit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Adicionar Unidade</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Identificador *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.identifier || ''}
                                        onChange={(e) => setForm(f => ({ ...f, identifier: e.target.value }))}
                                        required
                                        placeholder="Ex: A101"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Andar
                                    </label>
                                    <input
                                        type="number"
                                        value={form.floor ?? ''}
                                        onChange={(e) => setForm(f => ({ ...f, floor: e.target.value ? Number(e.target.value) : null }))}
                                        placeholder="Ex: 1"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Área (m²)
                                </label>
                                <input
                                    type="text"
                                    value={form.area_m2 ?? ''}
                                    onChange={(e) => setForm(f => ({ ...f, area_m2: e.target.value || null }))}
                                    placeholder="Ex: 85.5"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Nome do Proprietário
                                </label>
                                <input
                                    type="text"
                                    value={form.owner_name || ''}
                                    onChange={(e) => setForm(f => ({ ...f, owner_name: e.target.value }))}
                                    placeholder="Nome completo"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.owner_phone || ''}
                                        onChange={(e) => setForm(f => ({ ...f, owner_phone: e.target.value }))}
                                        placeholder="+238 XXX XXXX"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.owner_email || ''}
                                        onChange={(e) => setForm(f => ({ ...f, owner_email: e.target.value }))}
                                        placeholder="email@exemplo.com"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            {createMutation.isError && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Erro ao criar unidade. Verifique os dados e tente novamente.
                                </p>
                            )}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                    className="bg-trust-blue-600 text-white hover:bg-trust-blue-700"
                                >
                                    {createMutation.isPending ? 'A guardar...' : 'Guardar Unidade'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Maintenance Tab
// ---------------------------------------------------------------------------

const PRIORITY_ORDER: Record<MaintenancePriority, number> = {
    URGENT: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

function MaintenanceTab({
    requests,
    condominiumId,
    units,
    onOpenForm,
    onEdit,
}: {
    requests: MaintenanceRequest[];
    condominiumId: string;
    units?: Unit[];
    onOpenForm: () => void;
    onEdit: (request: MaintenanceRequest) => void;
}) {
    const [filterStatus, setFilterStatus] = useState<MaintenanceStatus | 'ALL'>('ALL');
    const [filterPriority, setFilterPriority] = useState<MaintenancePriority | 'ALL'>('ALL');

    const filtered = requests
        .filter((r) => filterStatus === 'ALL' || r.status === filterStatus)
        .filter((r) => filterPriority === 'ALL' || r.priority === filterPriority)
        .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Manutenções ({filtered.length}{filtered.length !== requests.length ? ` / ${requests.length}` : ''})
                </h2>
                <Button size="sm" className="rounded-xl bg-trust-blue-600 text-white" onClick={onOpenForm}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Nova Manutenção
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-2">
                {(['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={cn(
                            'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                            filterStatus === s
                                ? 'bg-trust-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                        )}
                    >
                        {s === 'ALL' ? 'Todos' : s === 'OPEN' ? 'Aberto' : s === 'IN_PROGRESS' ? 'Em Progresso' : 'Resolvido'}
                    </button>
                ))}
                <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
                {(['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setFilterPriority(p)}
                        className={cn(
                            'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                            filterPriority === p
                                ? 'bg-trust-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                        )}
                    >
                        {p === 'ALL' ? 'Todas' : PRIORITY_CONFIG[p].label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    {requests.length === 0 ? 'Nenhuma manutenção registada.' : 'Nenhum resultado para os filtros activos.'}
                </p>
            ) : (
                <div className="space-y-3">
                    {filtered.map((request) => {
                        const priority = PRIORITY_CONFIG[request.priority];
                        const status = STATUS_CONFIG[request.status];
                        const date = new Date(request.created_at).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        });
                        const resolvedDate = request.resolved_at
                            ? new Date(request.resolved_at).toLocaleDateString('pt-PT', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })
                            : null;

                        return (
                            <div
                                key={request.id}
                                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {request.title}
                                        </h3>
                                        {request.description && (
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {request.description}
                                            </p>
                                        )}
                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{request.unit ? `Unidade: ${request.unit}` : 'Área Comum'}</span>
                                            <span>•</span>
                                            <span>{date}</span>
                                            {resolvedDate && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-green-600 dark:text-green-400">Resolvido: {resolvedDate}</span>
                                                </>
                                            )}
                                        </div>
                                        {request.assigned_to_name && (
                                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold">Atribuído a:</span> {request.assigned_to_name}
                                                {request.assigned_to_phone && ` (${request.assigned_to_phone})`}
                                            </div>
                                        )}
                                        {(request.estimated_cost_cve || request.actual_cost_cve) && (
                                            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                                {request.estimated_cost_cve && (
                                                    <span>Custo estimado: {parseFloat(request.estimated_cost_cve).toLocaleString('pt-CV')} CVE</span>
                                                )}
                                                {request.actual_cost_cve && (
                                                    <span className="ml-3">
                                                        <span className="font-semibold">Custo real:</span> {parseFloat(request.actual_cost_cve).toLocaleString('pt-CV')} CVE
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {request.resolution_notes && (
                                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold">Notas:</span> {request.resolution_notes}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold", priority.color)}>
                                            {priority.label}
                                        </span>
                                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold", status.color)}>
                                            {status.label}
                                        </span>
                                        <button
                                            onClick={() => onEdit(request)}
                                            className="mt-1 text-xs font-medium text-trust-blue-600 hover:text-trust-blue-700 dark:text-trust-blue-400"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Notices Tab
// ---------------------------------------------------------------------------

function NoticesTab({
    notices,
    condominiumId,
    onOpenForm,
    onEdit,
}: {
    notices: Notice[];
    condominiumId: string;
    onOpenForm: () => void;
    onEdit: (notice: Notice) => void;
}) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (noticeId: string) =>
            condominiumsApi.deleteNotice(condominiumId, noticeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notices', condominiumId] });
        },
    });

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Avisos ({notices.length})
                </h2>
                <Button size="sm" className="rounded-xl bg-trust-blue-600 text-white" onClick={onOpenForm}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Novo Aviso
                </Button>
            </div>

            {notices.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nenhum aviso publicado.
                </p>
            ) : (
                <div className="space-y-3">
                    {notices.map((notice) => {
                        const isPublished = !!notice.published_at && new Date(notice.published_at) <= new Date();
                        const publishedAt = notice.published_at
                            ? new Date(notice.published_at).toLocaleDateString('pt-PT', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : null;

                        return (
                            <div
                                key={notice.id}
                                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {notice.title}
                                            </h3>
                                            <span className={cn(
                                                'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                                                isPublished
                                                    ? 'bg-hope-green-50 text-hope-green-600 dark:bg-hope-green-900/20'
                                                    : 'bg-dream-gold-50 text-dream-gold-600 dark:bg-dream-gold-900/20'
                                            )}>
                                                {isPublished ? 'Publicado' : 'Agendado'}
                                            </span>
                                        </div>
                                        {notice.body && (
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {notice.body}
                                            </p>
                                        )}
                                        {publishedAt && (
                                            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                                {isPublished ? 'Publicado' : 'Agendado'}: {publishedAt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex shrink-0 items-center gap-3">
                                        <button
                                            onClick={() => onEdit(notice)}
                                            className="text-xs font-medium text-trust-blue-600 hover:text-trust-blue-700 dark:text-trust-blue-400"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Apagar este aviso?')) {
                                                    deleteMutation.mutate(notice.id);
                                                }
                                            }}
                                            disabled={deleteMutation.isPending}
                                            className="text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                                        >
                                            Apagar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
