'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Button } from '@/components/ui/Button';
import { analyticsApi } from '@/lib/api/analytics';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { formatPrice } from '@/lib/utils/formatters';

export default function AgenteDashboardPage() {
  const { t } = useLocale();
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: () => analyticsApi.getDashboardStats(),
  });

  const kpis = [
    {
      title: t('agent.dashboard.kpiActiveProperties'),
      value: stats != null ? String(stats.total_properties) : '—',
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
    },
    {
      title: t('agent.dashboard.kpiActiveLeads'),
      value: stats != null ? String(stats.active_leads) : '—',
      icon: <UserGroupIcon className="h-6 w-6" />,
      trend: stats?.active_leads_trend,
      trendValue: stats?.active_leads_change,
    },
    {
      title: t('agent.dashboard.kpiClosedDeals'),
      value: stats != null ? String(stats.closed_deals_month) : '—',
      icon: <ChartBarIcon className="h-6 w-6" />,
      trend: stats?.closed_deals_trend,
      trendValue: stats?.closed_deals_change,
    },
    {
      title: t('agent.dashboard.kpiRevenue'),
      value: stats != null ? formatPrice(stats.revenue_month) : '—',
      icon: <BanknotesIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          {t('agent.dashboard.title')}
        </h1>
        <Link href="/agente/imoveis">
          <Button>{t('agent.dashboard.addProperty')}</Button>
        </Link>
      </div>
      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('agent.dashboard.loadingKpis')}</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{t('agent.dashboard.errorKpis')}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={isLoading ? '…' : kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            trendValue={kpi.trendValue}
          />
        ))}
      </div>
    </div>
  );
}
