'use client';

import { useQuery } from '@tanstack/react-query';
import {
  UserGroupIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  ClockIcon,
  CheckBadgeIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { adminApi } from '@/lib/api/admin';
import { KpiCard } from '@/components/dashboard/KpiCard';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminApi.getStats(),
  });

  const kpis = [
    {
      title: 'Total de Agentes',
      value: stats ? String(stats.total_agents) : '—',
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      title: 'Verificações Pendentes',
      value: stats ? String(stats.pending_verifications) : '—',
      icon: <ClockIcon className="h-6 w-6" />,
      alert: stats ? stats.pending_verifications > 0 : false,
    },
    {
      title: 'Total de Imóveis',
      value: stats ? String(stats.total_properties) : '—',
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
    },
    {
      title: 'Condomínios',
      value: stats ? String(stats.total_condominiums) : '—',
      icon: <HomeModernIcon className="h-6 w-6" />,
    },
    {
      title: 'Leads Ativos',
      value: stats ? String(stats.active_leads) : '—',
      icon: <CheckBadgeIcon className="h-6 w-6" />,
    },
    {
      title: 'Novos Agentes (mês)',
      value: stats ? String(stats.monthly_new_agents) : '—',
      icon: <UserPlusIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
            Visão Geral da Plataforma
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitoriza o estado da plataforma imo.cv em tempo real.
          </p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={isLoading ? '…' : kpi.value}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Ações Rápidas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            href="/admin/agentes?verified=false"
            icon={<ClockIcon className="h-5 w-5" />}
            title="Verificar Agentes"
            description="Aprova ou rejeita pedidos de verificação pendentes."
            badge={
              stats?.pending_verifications
                ? String(stats.pending_verifications)
                : undefined
            }
          />
          <QuickAction
            href="/admin/configuracoes"
            icon={<BuildingOffice2Icon className="h-5 w-5" />}
            title="Configurações"
            description="Gerir definições globais da plataforma."
          />
          <QuickAction
            href="/admin/condominios"
            icon={<HomeModernIcon className="h-5 w-5" />}
            title="Condomínios"
            description="Ver e gerir todos os condomínios registados."
          />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-imo-primary hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-blue-500"
    >
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-imo-surface text-imo-primary group-hover:bg-imo-primary group-hover:text-white dark:bg-primary-blue-900/30 dark:text-primary-blue-400">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
          {badge && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-400">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}
