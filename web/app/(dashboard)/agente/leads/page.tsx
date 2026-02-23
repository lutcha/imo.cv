'use client';

import { useRouter } from 'next/navigation';
import { useLeads, useUpdateLeadMutation } from '@/lib/hooks/useLeads';
import { PipelineKanban } from '@/components/dashboard/PipelineKanban';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { LeadStage } from '@/types/lead';
import { LEAD_STAGE_TO_STATUS } from '@/types/lead';

export default function AgenteLeadsPage() {
  const { t } = useLocale();
  const router = useRouter();
  const { data, isLoading } = useLeads({ limit: 100 });
  const updateLead = useUpdateLeadMutation();
  const leads = data?.results ?? [];

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
        <Button>{t('agent.leads.newLead')}</Button>
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
