'use client';

import { useRouter } from 'next/navigation';
import { useLeads, useUpdateLeadMutation } from '@/lib/hooks/useLeads';
import { PipelineKanban } from '@/components/dashboard/PipelineKanban';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { useAuthStore } from '@/lib/store/authStore';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import type { LeadStage } from '@/types/lead';
import { LEAD_STAGE_TO_STATUS } from '@/types/lead';

export default function AgenteLeadsPage() {
  const { t } = useLocale();
  const router = useRouter();
  const { data, isLoading } = useLeads({ limit: 100 });
  const updateLead = useUpdateLeadMutation();
  const leads = data?.results ?? [];
  const token = useAuthStore(s => s.token);

  const exportLeads = async () => {
    const response = await fetch('/api/backend/leads/export/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return;
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusChange = (lead: { id: string | number }, newStage: LeadStage) => {
    updateLead.mutate({
      id: String(lead.id),
      payload: { status: LEAD_STAGE_TO_STATUS[newStage] },
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          {t('agent.leads.title')}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportLeads}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar CSV
          </button>
          <Button>{t('agent.leads.newLead')}</Button>
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {t('agent.leads.hint')}
      </p>
      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : (
        <PipelineKanban
          leads={leads}
          onStatusChange={handleStatusChange}
          onLeadClick={(lead) => router.push(`/agente/leads/${lead.id}`)}
        />
      )}
    </div>
  );
}
