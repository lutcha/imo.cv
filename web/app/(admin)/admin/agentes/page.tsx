'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckBadgeIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { adminApi, type AgentRecord } from '@/lib/api/admin';
import { cn } from '@/lib/utils/helpers';

export default function AdminAgentesPage() {
  const [search, setSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<
    'all' | 'verified' | 'pending'
  >('all');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'agents', verifiedFilter, search],
    queryFn: () =>
      adminApi.listAgents({
        search: search || undefined,
        verified:
          verifiedFilter === 'verified'
            ? true
            : verifiedFilter === 'pending'
            ? false
            : undefined,
      }),
  });

  const verifyMutation = useMutation({
    mutationFn: ({
      id,
      verified,
    }: {
      id: string;
      verified: boolean;
    }) => adminApi.verifyAgent(id, verified),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'agents'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  const agents = data?.results ?? [];
  const total = data?.count ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
            Gestão de Agentes
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {total} agente{total !== 1 ? 's' : ''} registado
            {total !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Pesquisar por nome ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-imo-primary focus:outline-none focus:ring-1 focus:ring-imo-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 text-gray-400" />
          {(['all', 'verified', 'pending'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setVerifiedFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                verifiedFilter === f
                  ? 'bg-imo-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600'
              )}
            >
              {f === 'all' ? 'Todos' : f === 'verified' ? 'Verificados' : 'Pendentes'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-imo-primary border-t-transparent" />
          </div>
        ) : agents.length === 0 ? (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            Nenhum agente encontrado.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Agente
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Agência
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Imóveis
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Registo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Estado
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {agents.map((agent) => (
                <AgentRow
                  key={agent.id}
                  agent={agent}
                  onVerify={(verified) =>
                    verifyMutation.mutate({ id: agent.id, verified })
                  }
                  isPending={verifyMutation.isPending}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AgentRow({
  agent,
  onVerify,
  isPending,
}: {
  agent: AgentRecord;
  onVerify: (verified: boolean) => void;
  isPending: boolean;
}) {
  const joined = new Date(agent.date_joined).toLocaleDateString('pt-CV', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900 dark:text-white">
          {agent.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{agent.email}</p>
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {agent.agency_name ?? '—'}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {agent.total_properties}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{joined}</td>
      <td className="px-4 py-3">
        {agent.is_verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckBadgeIcon className="h-3.5 w-3.5" />
            Verificado
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <XCircleIcon className="h-3.5 w-3.5" />
            Pendente
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        {agent.is_verified ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => onVerify(false)}
            className="text-xs text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
          >
            Revogar
          </button>
        ) : (
          <button
            type="button"
            disabled={isPending}
            onClick={() => onVerify(true)}
            className="text-xs font-semibold text-imo-primary hover:underline disabled:opacity-50 dark:text-primary-blue-400"
          >
            Verificar
          </button>
        )}
      </td>
    </tr>
  );
}
