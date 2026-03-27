'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { condominiumsApi } from '@/lib/api/condominiums';
import { Button } from '@/components/ui/Button';
import {
    PlusIcon,
    ArrowLeftIcon,
    CalendarDaysIcon,
    LockClosedIcon,
    PlayIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';
import type { Assembly, AssemblyStatus } from '@/types/condominium';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<AssemblyStatus, { label: string; color: string }> = {
    SCHEDULED: { label: 'Agendada', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    OPEN:      { label: 'Em Curso', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    CLOSED:    { label: 'Encerrada', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
};

function formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString('pt-CV', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

// ---------------------------------------------------------------------------
// Create form schema
// ---------------------------------------------------------------------------

const schema = z.object({
    title:        z.string().min(3, 'Mínimo 3 caracteres'),
    description:  z.string().optional(),
    scheduled_at: z.string().min(1, 'Data obrigatória'),
    quorum_pct:   z.coerce.number().int().min(1).max(100),
});
type FormValues = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// Assembly card
// ---------------------------------------------------------------------------

function AssemblyCard({ assembly, condominiumId }: { assembly: Assembly; condominiumId: string }) {
    const router = useRouter();
    const cfg = STATUS_CONFIG[assembly.status];

    return (
        <button
            onClick={() => router.push(`/agente/condominios/${condominiumId}/assembleia/${assembly.id}`)}
            className="w-full text-left rounded-xl border border-gray-200 bg-white p-5 hover:border-trust-blue-300 hover:shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:hover:border-trust-blue-600"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{assembly.title}</p>
                    {assembly.description && (
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{assembly.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <CalendarDaysIcon className="h-3.5 w-3.5" />
                            {formatDateTime(assembly.scheduled_at)}
                        </span>
                        <span>{assembly.topics_count} ponto{assembly.topics_count !== 1 ? 's' : ''}</span>
                        <span>Quórum {assembly.quorum_pct}%</span>
                    </div>
                </div>
                <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold', cfg.color)}>
                    {cfg.label}
                </span>
            </div>
        </button>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AssembleiaListPage() {
    const params = useParams();
    const router = useRouter();
    const condominiumId = params.id as string;
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);

    const { data: condo } = useQuery({
        queryKey: ['condominium', condominiumId],
        queryFn: () => condominiumsApi.get(condominiumId),
    });

    const { data, isLoading } = useQuery({
        queryKey: ['assemblies', condominiumId],
        queryFn: () => condominiumsApi.listAssemblies(condominiumId),
        enabled: !!condominiumId,
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { quorum_pct: 51 },
    });

    const createMutation = useMutation({
        mutationFn: (values: FormValues) =>
            condominiumsApi.createAssembly(condominiumId, {
                condominium: condominiumId,
                title: values.title,
                description: values.description ?? '',
                scheduled_at: new Date(values.scheduled_at).toISOString(),
                quorum_pct: values.quorum_pct,
                status: 'SCHEDULED',
                minutes: '',
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['assemblies', condominiumId] });
            reset();
            setShowForm(false);
        },
    });

    const assemblies = data?.results ?? [];

    return (
        <div className="mx-auto max-w-4xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assembleias</h1>
                    {condo && <p className="text-sm text-gray-500 dark:text-gray-400">{condo.name}</p>}
                </div>
                <Button onClick={() => setShowForm(true)} size="sm">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nova Assembleia
                </Button>
            </div>

            {/* Create form */}
            {showForm && (
                <form
                    onSubmit={handleSubmit(v => createMutation.mutate(v))}
                    className="rounded-xl border border-trust-blue-200 bg-trust-blue-50 p-5 space-y-4 dark:border-trust-blue-800 dark:bg-trust-blue-900/10"
                >
                    <h2 className="font-semibold text-gray-900 dark:text-white">Nova Assembleia</h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
                            <input
                                {...register('title')}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Ex: Assembleia Geral Ordinária 2026"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                            <textarea
                                {...register('description')}
                                rows={2}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Opcional — ordem do dia resumida"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Data e Hora *</label>
                            <input
                                type="datetime-local"
                                {...register('scheduled_at')}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.scheduled_at && <p className="mt-1 text-xs text-red-500">{errors.scheduled_at.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quórum (%)</label>
                            <input
                                type="number"
                                {...register('quorum_pct')}
                                min={1} max={100}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.quorum_pct && <p className="mt-1 text-xs text-red-500">{errors.quorum_pct.message}</p>}
                        </div>
                    </div>

                    {createMutation.isError && (
                        <p className="text-xs text-red-500">Erro ao criar assembleia. Tente novamente.</p>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" type="button" onClick={() => { reset(); setShowForm(false); }}>
                            Cancelar
                        </Button>
                        <Button size="sm" type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'A criar…' : 'Criar Assembleia'}
                        </Button>
                    </div>
                </form>
            )}

            {/* List */}
            {isLoading ? (
                <div className="space-y-3">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            ) : assemblies.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 dark:border-gray-700">
                    <CalendarDaysIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nenhuma assembleia registada</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Clique em "Nova Assembleia" para começar</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* Pinned: open first */}
                    {assemblies.filter(a => a.status === 'OPEN').map(a => (
                        <AssemblyCard key={a.id} assembly={a} condominiumId={condominiumId} />
                    ))}
                    {assemblies.filter(a => a.status === 'SCHEDULED').map(a => (
                        <AssemblyCard key={a.id} assembly={a} condominiumId={condominiumId} />
                    ))}
                    {assemblies.filter(a => a.status === 'CLOSED').map(a => (
                        <AssemblyCard key={a.id} assembly={a} condominiumId={condominiumId} />
                    ))}
                </div>
            )}
        </div>
    );
}
