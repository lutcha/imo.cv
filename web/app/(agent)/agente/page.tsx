'use client';

import Link from 'next/link';
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Button } from '@/components/ui/Button';

export default function AgenteDashboardPage() {
  const kpis = [
    { title: 'Imóveis ativos', value: '—', icon: <BuildingOffice2Icon className="h-6 w-6" /> },
    { title: 'Leads este mês', value: '—', icon: <UserGroupIcon className="h-6 w-6" /> },
    { title: 'Negócios fechados', value: '—', icon: <ChartBarIcon className="h-6 w-6" /> },
    { title: 'Receita (mês)', value: '—', icon: <BanknotesIcon className="h-6 w-6" /> },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          Dashboard
        </h1>
        <Link href="/agente/imoveis">
          <Button>Adicionar imóvel</Button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
          />
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Conecte o backend para preencher os KPIs. API: GET /api/v1/analytics/dashboard/
      </p>
    </div>
  );
}
