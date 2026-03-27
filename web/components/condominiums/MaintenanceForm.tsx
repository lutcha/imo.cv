'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { condominiumsApi } from '@/lib/api/condominiums';
import type { MaintenanceRequest, MaintenanceStatus, MaintenancePriority, Unit } from '@/types/condominium';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';

// ---------------------------------------------------------------------------
// Schema de validação
// ---------------------------------------------------------------------------

const maintenanceFormSchema = z.object({
    title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
    description: z.string().optional(),
    unit: z.string().nullable().optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    // Campos de gestão (Sprint 3-A)
    assigned_to_name: z.string().nullable().optional(),
    assigned_to_phone: z.string().nullable().optional(),
    estimated_cost_cve: z.string().nullable().optional(),
    actual_cost_cve: z.string().nullable().optional(),
    resolved_at: z.string().nullable().optional(),
    resolution_notes: z.string().nullable().optional(),
});

type MaintenanceFormData = z.infer<typeof maintenanceFormSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MaintenanceFormProps {
    condominiumId: string;
    maintenanceId?: string; // Se presente, modo de edição
    initialData?: MaintenanceRequest;
    units?: Unit[];
    onClose: () => void;
    onSuccess?: () => void;
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function MaintenanceForm({
    condominiumId,
    maintenanceId,
    initialData,
    units,
    onClose,
    onSuccess,
}: MaintenanceFormProps) {
    const isEditing = !!maintenanceId;
    const queryClient = useQueryClient();
    const [showManagementFields, setShowManagementFields] = useState(isEditing);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<MaintenanceFormData>({
        resolver: zodResolver(maintenanceFormSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            unit: initialData?.unit || null,
            status: initialData?.status || 'OPEN',
            priority: initialData?.priority || 'MEDIUM',
            assigned_to_name: initialData?.assigned_to_name || '',
            assigned_to_phone: initialData?.assigned_to_phone || '',
            estimated_cost_cve: initialData?.estimated_cost_cve || '',
            actual_cost_cve: initialData?.actual_cost_cve || '',
            resolved_at: initialData?.resolved_at || null,
            resolution_notes: initialData?.resolution_notes || '',
        },
    });

    const status = watch('status');

    // Auto-set resolved_at when status changes to RESOLVED
    useEffect(() => {
        if (status === 'RESOLVED' && !watch('resolved_at')) {
            setValue('resolved_at', new Date().toISOString());
        }
    }, [status, setValue, watch]);

    const createMutation = useMutation({
        mutationFn: (data: MaintenanceFormData) =>
            condominiumsApi.createMaintenance(condominiumId, data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenance', condominiumId] });
            onSuccess?.();
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: MaintenanceFormData }) =>
            condominiumsApi.updateMaintenance(condominiumId, id, data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenance', condominiumId] });
            onSuccess?.();
            onClose();
        },
    });

    const onSubmit = (data: MaintenanceFormData) => {
        // Limpar campos vazios
        const cleanedData = {
            ...data,
            assigned_to_name: data.assigned_to_name || null,
            assigned_to_phone: data.assigned_to_phone || null,
            estimated_cost_cve: data.estimated_cost_cve || null,
            actual_cost_cve: data.actual_cost_cve || null,
            resolved_at: data.resolved_at || null,
            resolution_notes: data.resolution_notes || null,
        };

        if (isEditing && maintenanceId) {
            updateMutation.mutate({ id: maintenanceId, data: cleanedData });
        } else {
            createMutation.mutate(cleanedData);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Editar Manutenção' : 'Nova Manutenção'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Fechar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Título *
                        </label>
                        <input
                            {...register('title')}
                            type="text"
                            placeholder="Ex: Elevador avariado"
                            className={cn(
                                "mt-1 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:text-white",
                                errors.title
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-trust-blue-500 focus:ring-trust-blue-500 dark:border-gray-600"
                            )}
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Descrição
                        </label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            placeholder="Descreva o problema..."
                            className={cn(
                                "mt-1 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:text-white",
                                errors.description
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-trust-blue-500 focus:ring-trust-blue-500 dark:border-gray-600"
                            )}
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Unidade e Prioridade */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Unidade
                            </label>
                            <select
                                {...register('unit')}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="">Área Comum</option>
                                {units?.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.identifier}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Prioridade *
                            </label>
                            <select
                                {...register('priority')}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="LOW">Baixa</option>
                                <option value="MEDIUM">Média</option>
                                <option value="HIGH">Alta</option>
                                <option value="URGENT">Urgente</option>
                            </select>
                        </div>
                    </div>

                    {/* Estado */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Estado *
                        </label>
                        <div className="mt-2 flex gap-2">
                            {(['OPEN', 'IN_PROGRESS', 'RESOLVED'] as MaintenanceStatus[]).map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setValue('status', s)}
                                    className={cn(
                                        "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                                        status === s
                                            ? s === 'OPEN'
                                                ? 'bg-red-100 text-red-700 ring-2 ring-red-500 dark:bg-red-900/30'
                                                : s === 'IN_PROGRESS'
                                                ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 dark:bg-yellow-900/30'
                                                : 'bg-green-100 text-green-700 ring-2 ring-green-500 dark:bg-green-900/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                    )}
                                >
                                    {s === 'OPEN' ? 'Aberto' : s === 'IN_PROGRESS' ? 'Em Progresso' : 'Resolvido'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggle Campos de Gestão */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setShowManagementFields(!showManagementFields)}
                            className="text-sm font-medium text-trust-blue-600 hover:text-trust-blue-700 dark:text-trust-blue-400"
                        >
                            {showManagementFields ? 'Ocultar' : 'Mostrar'} campos de gestão
                        </button>
                    </div>

                    {/* Campos de Gestão (Sprint 3-A) */}
                    {showManagementFields && (
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Gestão da Ordem de Serviço
                            </h3>

                            {/* Prestador */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                        Atribuído a (nome)
                                    </label>
                                    <input
                                        {...register('assigned_to_name')}
                                        type="text"
                                        placeholder="Nome do prestador"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                        Telefone
                                    </label>
                                    <input
                                        {...register('assigned_to_phone')}
                                        type="tel"
                                        placeholder="+238 XXX XXXX"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Custos */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                        Custo Estimado (CVE)
                                    </label>
                                    <input
                                        {...register('estimated_cost_cve')}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                        Custo Real (CVE)
                                    </label>
                                    <input
                                        {...register('actual_cost_cve')}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Data de Resolução */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Data de Resolução
                                </label>
                                <input
                                    {...register('resolved_at')}
                                    type="datetime-local"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Notas de Resolução */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Notas de Resolução
                                </label>
                                <textarea
                                    {...register('resolution_notes')}
                                    rows={2}
                                    placeholder="Descreva o trabalho realizado..."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-trust-blue-600 text-white hover:bg-trust-blue-700"
                        >
                            {isSubmitting ? 'A guardar...' : isEditing ? 'Guardar Alterações' : 'Criar Manutenção'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
