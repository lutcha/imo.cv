'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { condominiumsApi } from '@/lib/api/condominiums';
import { ISLAND_OPTIONS, CURRENCY_OPTIONS } from '@/types/condominium';
import type { Condominium } from '@/types/condominium';
import { cn } from '@/lib/utils/helpers';

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório (mínimo 2 caracteres)'),
  island: z.enum(['SANTIAGO', 'SAL', 'BOA_VISTA', 'SAO_VICENTE', 'SAO_ANTAO', 'FOGO', 'SAO_NICOLAU', 'MAIO', 'BRAVA']),
  municipality: z.string().min(2, 'Município obrigatório'),
  address: z.string().optional(),
  currency: z.enum(['CVE', 'EUR', 'USD']),
  is_active: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CondominiumFormProps {
  /** Modo edição se passado; modo criação se omitido */
  condominium?: Condominium;
  onSuccess: (condominium: Condominium) => void;
  onCancel: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CondominiumForm({ condominium, onSuccess, onCancel }: CondominiumFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!condominium;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: condominium
      ? {
          name: condominium.name,
          island: condominium.island,
          municipality: condominium.municipality,
          address: condominium.address ?? '',
          currency: condominium.currency,
          is_active: condominium.is_active,
        }
      : {
          island: 'SANTIAGO',
          currency: 'CVE',
          is_active: true,
          address: '',
          municipality: '',
          name: '',
        },
  });

  const isActive = watch('is_active');

  type Payload = Omit<FormValues, 'address'> & { address: string };

  const createMutation = useMutation({
    mutationFn: (payload: Payload) => condominiumsApi.create(payload),
    onSuccess: (newCondo) => {
      queryClient.invalidateQueries({ queryKey: ['condominiums'] });
      onSuccess(newCondo);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Payload) => condominiumsApi.update(condominium!.id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['condominiums'] });
      queryClient.invalidateQueries({ queryKey: ['condominium', condominium!.id] });
      onSuccess(updated);
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isError = createMutation.isError || updateMutation.isError;

  const onSubmit = (data: FormValues) => {
    const payload: Payload = { ...data, address: data.address ?? '' };
    if (isEditing) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const selectClass = cn(
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-primary-blue-500',
    'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Editar Condomínio' : 'Novo Condomínio'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 p-6">
            {/* Nome */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nome do condomínio *
              </label>
              <Input
                {...register('name')}
                placeholder="ex: Residencial Mar Azul"
                error={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Ilha + Município */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Ilha *
                </label>
                <select {...register('island')} className={selectClass}>
                  {ISLAND_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.island && (
                  <p className="mt-1 text-xs text-red-600">{errors.island.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Município *
                </label>
                <Input
                  {...register('municipality')}
                  placeholder="ex: Praia"
                  error={!!errors.municipality}
                />
                {errors.municipality && (
                  <p className="mt-1 text-xs text-red-600">{errors.municipality.message}</p>
                )}
              </div>
            </div>

            {/* Morada */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Morada
              </label>
              <textarea
                {...register('address')}
                rows={2}
                placeholder="ex: Rua 5 de Julho, nº 12"
                className={cn(selectClass, 'resize-none')}
              />
            </div>

            {/* Moeda + Ativo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Moeda *
                </label>
                <select {...register('currency')} className={selectClass}>
                  {CURRENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-center">
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Estado
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setValue('is_active', !isActive)}
                    className={cn(
                      'relative inline-flex h-6 w-10 flex-shrink-0 rounded-full transition-colors duration-200',
                      isActive ? 'bg-hope-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200',
                        isActive ? 'translate-x-4' : 'translate-x-0.5',
                        'mt-0.5'
                      )}
                    />
                  </button>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* API Error */}
          {isError && (
            <p className="px-6 pb-2 text-sm text-red-600 dark:text-red-400">
              Erro ao guardar. Verifica os dados e tenta novamente.
            </p>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 p-6 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isPending}
              className="bg-trust-blue-600 text-white hover:bg-trust-blue-700"
            >
              {isEditing ? 'Guardar Alterações' : 'Criar Condomínio'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
