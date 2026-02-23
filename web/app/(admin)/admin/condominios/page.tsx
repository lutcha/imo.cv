'use client';

import { useQuery } from '@tanstack/react-query';
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import apiClient from '@/lib/api/client';

interface CondominiumRecord {
  id: string;
  name: string;
  address: string;
  island: string;
  total_units: number;
  agency_name: string;
  open_maintenance: number;
  pending_fees: number;
}

async function fetchCondominiums(): Promise<CondominiumRecord[]> {
  const { data } = await apiClient.get('/admin/condominiums/');
  return Array.isArray(data) ? data : (data.results ?? []);
}

export default function AdminCondominiosPage() {
  const { data: condominiums = [], isLoading } = useQuery({
    queryKey: ['admin', 'condominiums'],
    queryFn: fetchCondominiums,
  });

  const totalUnits = condominiums.reduce((s, c) => s + c.total_units, 0);
  const openMaintenance = condominiums.reduce(
    (s, c) => s + c.open_maintenance,
    0
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
            Condomínios
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Todos os condomínios registados na plataforma.
          </p>
        </div>
        <Button>Adicionar Condomínio</Button>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: BuildingOffice2Icon,
            label: 'Total de Edifícios',
            value: String(condominiums.length),
            color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
          },
          {
            icon: UserGroupIcon,
            label: 'Total de Frações',
            value: String(totalUnits),
            color:
              'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
          },
          {
            icon: WrenchScrewdriverIcon,
            label: 'Reparações Abertas',
            value: String(openMaintenance),
            color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}
            >
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {isLoading ? '…' : s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Pesquisar condomínio…"
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-imo-primary focus:outline-none focus:ring-1 focus:ring-imo-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-imo-primary border-t-transparent" />
          </div>
        ) : condominiums.length === 0 ? (
          <div className="py-16 text-center">
            <BuildingOffice2Icon className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum condomínio registado.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Nome
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Ilha
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Frações
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Agência
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">
                  Manutenção
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {condominiums.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {c.address}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.island}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.total_units}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.agency_name}
                  </td>
                  <td className="px-4 py-3">
                    {c.open_maintenance > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {c.open_maintenance} abertas
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 dark:text-green-400">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
