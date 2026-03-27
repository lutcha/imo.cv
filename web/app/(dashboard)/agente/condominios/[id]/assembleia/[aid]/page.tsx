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
    ArrowLeftIcon,
    PlusIcon,
    TrashIcon,
    PlayIcon,
    LockClosedIcon,
    CheckCircleIcon,
    XCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';
import type { AssemblyStatus, AssemblyTopic, VoteChoice } from '@/types/condominium';

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
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function VoteBar({ yes, no, abstain, total }: { yes: number; no: number; abstain: number; total: number }) {
    if (total === 0) return <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Sem votos registados</p>;
    const pct = (n: number) => total > 0 ? Math.round(n / total * 100) : 0;
    return (
        <div className="mt-2 space-y-1">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="bg-green-500 transition-all" style={{ width: `${pct(yes)}%` }} />
                <div className="bg-red-400 transition-all" style={{ width: `${pct(no)}%` }} />
                <div className="bg-gray-400 transition-all" style={{ width: `${pct(abstain)}%` }} />
            </div>
            <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                    Sim {yes} ({pct(yes)}%)
                </span>
                <span className="flex items-center gap-1">
                    <XCircleIcon className="h-3.5 w-3.5 text-red-400" />
                    Não {no} ({pct(no)}%)
                </span>
                <span className="flex items-center gap-1">
                    <MinusCircleIcon className="h-3.5 w-3.5 text-gray-400" />
                    Abstenção {abstain}
                </span>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Topic card
// ---------------------------------------------------------------------------

function TopicCard({
    topic,
    assemblyStatus,
    condominiumId,
    assemblyId,
    unitId,
    onDelete,
}: {
    topic: AssemblyTopic;
    assemblyStatus: AssemblyStatus;
    condominiumId: string;
    assemblyId: string;
    unitId?: string;
    onDelete: (id: string) => void;
}) {
    const qc = useQueryClient();
    const [casting, setCasting] = useState(false);

    const voteMutation = useMutation({
        mutationFn: (choice: VoteChoice) =>
            condominiumsApi.castVote(condominiumId, assemblyId, topic.id, {
                unit: unitId ?? '',
                choice,
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['assembly', condominiumId, assemblyId] });
            setCasting(false);
        },
    });

    const canVote = assemblyStatus === 'OPEN' && topic.requires_vote && !!unitId;

    const VOTE_BUTTONS: { choice: VoteChoice; label: string; cls: string; icon: React.ReactNode }[] = [
        {
            choice: 'YES',
            label: 'Sim',
            cls: 'border-green-400 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300',
            icon: <CheckCircleIcon className="h-4 w-4" />,
        },
        {
            choice: 'NO',
            label: 'Não',
            cls: 'border-red-400 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300',
            icon: <XCircleIcon className="h-4 w-4" />,
        },
        {
            choice: 'ABSTAIN',
            label: 'Abstenção',
            cls: 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400',
            icon: <MinusCircleIcon className="h-4 w-4" />,
        },
    ];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">#{topic.order + 1}</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{topic.title}</p>
                        {!topic.requires_vote && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                Informativo
                            </span>
                        )}
                    </div>
                    {topic.description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{topic.description}</p>
                    )}
                </div>
                {assemblyStatus !== 'CLOSED' && (
                    <button
                        onClick={() => onDelete(topic.id)}
                        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            {topic.requires_vote && (
                <div className="mt-3">
                    <VoteBar
                        yes={topic.vote_yes}
                        no={topic.vote_no}
                        abstain={topic.vote_abstain}
                        total={topic.total_votes}
                    />
                </div>
            )}

            {canVote && (
                <div className="mt-3">
                    {topic.my_vote ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                O seu voto: <strong>{topic.my_vote === 'YES' ? 'Sim' : topic.my_vote === 'NO' ? 'Não' : 'Abstenção'}</strong>
                            </span>
                            <button
                                onClick={() => setCasting(true)}
                                className="text-xs text-trust-blue-600 hover:underline dark:text-trust-blue-400"
                            >
                                Alterar
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setCasting(true)}
                            className="text-xs font-medium text-trust-blue-600 hover:underline dark:text-trust-blue-400"
                        >
                            Votar →
                        </button>
                    )}

                    {casting && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {VOTE_BUTTONS.map(({ choice, label, cls, icon }) => (
                                <button
                                    key={choice}
                                    onClick={() => voteMutation.mutate(choice)}
                                    disabled={voteMutation.isPending}
                                    className={cn(
                                        'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                                        cls,
                                        topic.my_vote === choice && 'ring-2 ring-offset-1 ring-current',
                                    )}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                            <button
                                onClick={() => setCasting(false)}
                                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 self-center"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Topic form schema
// ---------------------------------------------------------------------------

const topicSchema = z.object({
    title:        z.string().min(2, 'Mínimo 2 caracteres'),
    description:  z.string().optional(),
    order:        z.coerce.number().int().min(0),
    requires_vote: z.boolean(),
});
type TopicFormValues = z.infer<typeof topicSchema>;

// ---------------------------------------------------------------------------
// Close form schema
// ---------------------------------------------------------------------------

const closeSchema = z.object({
    minutes: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AssemblyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const condominiumId = params.id as string;
    const assemblyId = params.aid as string;
    const qc = useQueryClient();

    const [showTopicForm, setShowTopicForm] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [minutes, setMinutes] = useState('');

    // TODO: in a real app, get unitId from auth store (resident context)
    // For the manager view, we pass undefined — voting is for residents
    const unitId: string | undefined = undefined;

    const { data: assembly, isLoading } = useQuery({
        queryKey: ['assembly', condominiumId, assemblyId],
        queryFn: () => condominiumsApi.getAssembly(condominiumId, assemblyId),
        enabled: !!condominiumId && !!assemblyId,
    });

    const topicForm = useForm<TopicFormValues>({
        resolver: zodResolver(topicSchema),
        defaultValues: { order: assembly?.topics.length ?? 0, requires_vote: true },
    });

    const openMutation = useMutation({
        mutationFn: () => condominiumsApi.openAssembly(condominiumId, assemblyId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['assembly', condominiumId, assemblyId] }),
    });

    const closeMutation = useMutation({
        mutationFn: () => condominiumsApi.closeAssembly(condominiumId, assemblyId, minutes),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['assembly', condominiumId, assemblyId] });
            qc.invalidateQueries({ queryKey: ['assemblies', condominiumId] });
            setShowCloseModal(false);
        },
    });

    const addTopicMutation = useMutation({
        mutationFn: (values: TopicFormValues) =>
            condominiumsApi.createTopic(condominiumId, assemblyId, {
                title: values.title,
                description: values.description ?? '',
                order: values.order,
                requires_vote: values.requires_vote,
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['assembly', condominiumId, assemblyId] });
            topicForm.reset({ order: (assembly?.topics.length ?? 0) + 1, requires_vote: true });
            setShowTopicForm(false);
        },
    });

    const deleteTopicMutation = useMutation({
        mutationFn: (topicId: string) =>
            condominiumsApi.deleteTopic(condominiumId, assemblyId, topicId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['assembly', condominiumId, assemblyId] }),
    });

    const handleDeleteTopic = (topicId: string) => {
        if (confirm('Remover este ponto da ordem do dia?')) {
            deleteTopicMutation.mutate(topicId);
        }
    };

    if (isLoading || !assembly) {
        return (
            <div className="mx-auto max-w-3xl p-6 space-y-4">
                <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                {[0, 1, 2].map(i => (
                    <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                ))}
            </div>
        );
    }

    const cfg = STATUS_CONFIG[assembly.status];
    const votedUnits = assembly.topics[0]?.total_votes ?? 0;
    const quorumReached = assembly.total_units > 0 &&
        (votedUnits / assembly.total_units * 100) >= assembly.quorum_pct;

    return (
        <div className="mx-auto max-w-3xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
                <button
                    onClick={() => router.back()}
                    className="mt-1 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{assembly.title}</h1>
                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', cfg.color)}>
                            {cfg.label}
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(assembly.scheduled_at)} · Quórum {assembly.quorum_pct}% · {assembly.total_units} unidades
                    </p>
                    {assembly.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{assembly.description}</p>
                    )}
                </div>
            </div>

            {/* Status actions */}
            {assembly.status === 'SCHEDULED' && (
                <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/10">
                    <PlayIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <p className="flex-1 text-sm text-blue-700 dark:text-blue-300">
                        Abra a assembleia para iniciar a votação em tempo real.
                    </p>
                    <Button
                        size="sm"
                        onClick={() => openMutation.mutate()}
                        disabled={openMutation.isPending}
                    >
                        {openMutation.isPending ? 'A abrir…' : 'Abrir Assembleia'}
                    </Button>
                </div>
            )}

            {assembly.status === 'OPEN' && (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/10">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                            Assembleia em curso · votação activa
                        </p>
                        <p className={cn(
                            'mt-0.5 text-xs',
                            quorumReached ? 'text-green-600 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'
                        )}>
                            {quorumReached
                                ? `Quórum atingido (${votedUnits}/${assembly.total_units} votos)`
                                : `Aguarda quórum — ${votedUnits}/${assembly.total_units} unidades votaram`}
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowCloseModal(true)}
                    >
                        <LockClosedIcon className="h-4 w-4 mr-1" />
                        Encerrar
                    </Button>
                </div>
            )}

            {assembly.status === 'CLOSED' && assembly.minutes && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Acta</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{assembly.minutes}</p>
                </div>
            )}

            {/* Topics */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Ordem do Dia ({assembly.topics.length})
                    </h2>
                    {assembly.status !== 'CLOSED' && (
                        <Button variant="ghost" size="sm" onClick={() => setShowTopicForm(true)}>
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Adicionar ponto
                        </Button>
                    )}
                </div>

                {showTopicForm && (
                    <form
                        onSubmit={topicForm.handleSubmit(v => addTopicMutation.mutate(v))}
                        className="mb-4 rounded-xl border border-trust-blue-200 bg-trust-blue-50 p-4 space-y-3 dark:border-trust-blue-800 dark:bg-trust-blue-900/10"
                    >
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
                                <input
                                    {...topicForm.register('title')}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ex: Aprovação do orçamento 2026"
                                />
                                {topicForm.formState.errors.title && (
                                    <p className="mt-1 text-xs text-red-500">{topicForm.formState.errors.title.message}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                <textarea
                                    {...topicForm.register('description')}
                                    rows={2}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Ordem</label>
                                <input
                                    type="number"
                                    {...topicForm.register('order')}
                                    min={0}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-5">
                                <input
                                    type="checkbox"
                                    id="requires_vote"
                                    {...topicForm.register('requires_vote')}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="requires_vote" className="text-sm text-gray-700 dark:text-gray-300">
                                    Requer votação
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="ghost" size="sm" type="button"
                                onClick={() => { topicForm.reset(); setShowTopicForm(false); }}
                            >
                                Cancelar
                            </Button>
                            <Button size="sm" type="submit" disabled={addTopicMutation.isPending}>
                                {addTopicMutation.isPending ? 'A adicionar…' : 'Adicionar'}
                            </Button>
                        </div>
                    </form>
                )}

                {assembly.topics.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                        Nenhum ponto na ordem do dia. Adicione pontos acima.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {assembly.topics.map(topic => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                                assemblyStatus={assembly.status}
                                condominiumId={condominiumId}
                                assemblyId={assemblyId}
                                unitId={unitId}
                                onDelete={handleDeleteTopic}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Close modal */}
            {showCloseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Encerrar Assembleia</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Após encerrar, a votação será bloqueada. Pode adicionar a acta agora ou depois.
                        </p>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Acta / Resumo (opcional)
                        </label>
                        <textarea
                            value={minutes}
                            onChange={e => setMinutes(e.target.value)}
                            rows={5}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Registe os principais pontos decididos…"
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setShowCloseModal(false)}>
                                Cancelar
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => closeMutation.mutate()}
                                disabled={closeMutation.isPending}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                {closeMutation.isPending ? 'A encerrar…' : 'Confirmar Encerramento'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
