'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { condominiumsApi } from '@/lib/api/condominiums';
import type { Notice } from '@/types/condominium';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const WHATSAPP_GREEN = 'bg-[#25D366] hover:bg-[#1ebe5d] text-white';

// ---------------------------------------------------------------------------
// Schema de validação
// ---------------------------------------------------------------------------

const noticeFormSchema = z.object({
    title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
    body: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
    published_at: z.string().nullable().optional(),
});

type NoticeFormData = z.infer<typeof noticeFormSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface NoticeFormProps {
    condominiumId: string;
    noticeId?: string; // Se presente, modo de edição
    initialData?: Notice;
    onClose: () => void;
    onSuccess?: () => void;
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function NoticeForm({
    condominiumId,
    noticeId,
    initialData,
    onClose,
    onSuccess,
}: NoticeFormProps) {
    const isEditing = !!noticeId;
    const queryClient = useQueryClient();
    const [publishMode, setPublishMode] = useState<'now' | 'schedule'>(
        initialData?.published_at ? 'now' : 'schedule'
    );
    const [whatsappResult, setWhatsappResult] = useState<{ sent: number; total: number } | null>(null);

    const whatsappMutation = useMutation({
        mutationFn: () => condominiumsApi.sendNoticeWhatsApp(condominiumId, noticeId!),
        onSuccess: (result) => setWhatsappResult({ sent: result.sent, total: result.total }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<NoticeFormData>({
        resolver: zodResolver(noticeFormSchema),
        defaultValues: {
            title: initialData?.title || '',
            body: initialData?.body || '',
            published_at: initialData?.published_at 
                ? new Date(initialData.published_at).toISOString().slice(0, 16)
                : null,
        },
    });

    const selectedPublishAt = watch('published_at');

    const createMutation = useMutation({
        mutationFn: (data: NoticeFormData) =>
            condominiumsApi.createNotice(condominiumId, {
                ...data,
                published_at: publishMode === 'now' 
                    ? new Date().toISOString() 
                    : data.published_at || null,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notices', condominiumId] });
            onSuccess?.();
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: NoticeFormData }) =>
            condominiumsApi.updateNotice(condominiumId, id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notices', condominiumId] });
            onSuccess?.();
            onClose();
        },
    });

    const onSubmit = (data: NoticeFormData) => {
        const cleanedData = {
            ...data,
            published_at: publishMode === 'now' 
                ? new Date().toISOString() 
                : data.published_at || null,
        };

        if (isEditing && noticeId) {
            updateMutation.mutate({ id: noticeId, data: cleanedData });
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
                        {isEditing ? 'Editar Aviso' : 'Novo Aviso'}
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
                            placeholder="Ex: Interrupção de água no dia 15"
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

                    {/* Conteúdo */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Conteúdo *
                        </label>
                        <textarea
                            {...register('body')}
                            rows={6}
                            placeholder="Escreva o comunicado aqui..."
                            className={cn(
                                "mt-1 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:text-white",
                                errors.body
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-trust-blue-500 focus:ring-trust-blue-500 dark:border-gray-600"
                            )}
                        />
                        {errors.body && (
                            <p className="mt-1 text-xs text-red-600">{errors.body.message}</p>
                        )}
                    </div>

                    {/* Preview do Conteúdo */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-tight">
                            <EyeIcon className="h-4 w-4" />
                            Pré-visualização
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {watch('title') || 'Título do aviso'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                {watch('body') || 'O conteúdo do aviso aparecerá aqui...'}
                            </p>
                        </div>
                    </div>

                    {/* Modo de Publicação */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Publicação
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setPublishMode('now')}
                                className={cn(
                                    "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors border",
                                    publishMode === 'now'
                                        ? "bg-trust-blue-100 text-trust-blue-700 border-trust-blue-500 dark:bg-trust-blue-900/30"
                                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                )}
                            >
                                <EyeIcon className="mx-auto mb-1 h-5 w-5" />
                                Publicar agora
                            </button>
                            <button
                                type="button"
                                onClick={() => setPublishMode('schedule')}
                                className={cn(
                                    "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors border",
                                    publishMode === 'schedule'
                                        ? "bg-trust-blue-100 text-trust-blue-700 border-trust-blue-500 dark:bg-trust-blue-900/30"
                                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                )}
                            >
                                <EyeSlashIcon className="mx-auto mb-1 h-5 w-5" />
                                Agendar
                            </button>
                        </div>
                    </div>

                    {/* Data de Publicação (se agendado) */}
                    {publishMode === 'schedule' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Data e hora de publicação *
                            </label>
                            <input
                                {...register('published_at', { 
                                    required: publishMode === 'schedule' ? 'Data é obrigatória' : false 
                                })}
                                type="datetime-local"
                                className={cn(
                                    "mt-1 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:text-white",
                                    errors.published_at
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:border-trust-blue-500 focus:ring-trust-blue-500 dark:border-gray-600"
                                )}
                            />
                            {errors.published_at && (
                                <p className="mt-1 text-xs text-red-600">{errors.published_at.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                O aviso ficará visível automaticamente nesta data.
                            </p>
                        </div>
                    )}

                    {/* Info sobre publicação imediata */}
                    {publishMode === 'now' && !isEditing && (
                        <div className="rounded-lg bg-dream-gold-50 p-3 dark:bg-dream-gold-900/20">
                            <p className="text-sm text-dream-gold-700 dark:text-dream-gold-400">
                                <span className="font-semibold">Nota:</span> O aviso será publicado imediatamente e visível para todos os moradores.
                            </p>
                        </div>
                    )}

                    {/* WhatsApp send result */}
                    {whatsappResult && (
                        <div className="rounded-lg bg-[#e8fdf0] px-4 py-3 text-sm font-medium text-[#1a7a3c] dark:bg-[#0d3320] dark:text-[#5cdd8b]">
                            ✅ Enviado para {whatsappResult.sent} de {whatsappResult.total} proprietários via WhatsApp.
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {/* WhatsApp button — only when editing an existing notice */}
                        {isEditing ? (
                            <Button
                                type="button"
                                onClick={() => whatsappMutation.mutate()}
                                disabled={whatsappMutation.isPending}
                                className={cn('flex items-center gap-2', WHATSAPP_GREEN)}
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.848L0 24l6.335-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.001-1.368l-.358-.214-3.758.906.947-3.658-.233-.374A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                                </svg>
                                {whatsappMutation.isPending ? 'A enviar...' : 'Enviar via WhatsApp'}
                            </Button>
                        ) : (
                            <span />
                        )}

                        <div className="flex gap-3">
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
                                {isSubmitting
                                    ? 'A guardar...'
                                    : isEditing
                                        ? 'Guardar Alterações'
                                        : publishMode === 'now'
                                            ? 'Publicar Aviso'
                                            : 'Agendar Aviso'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
