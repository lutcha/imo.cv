'use client';

import { useLeads } from '@/lib/hooks/useLeads';
import { PipelineKanban } from '@/components/dashboard/PipelineKanban';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/common/Skeleton';

export default function AgenteLeadsPage() {
  const { data, isLoading } = useLeads({ limit: 100 });
  const leads = data?.results ?? [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          Pipeline de leads
        </h1>
        <Button>Novo lead</Button>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Arrasta os cartões entre colunas para atualizar o estado. Integrar PATCH
        /api/v1/leads/:id/
      </p>
      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : (
        <PipelineKanban leads={leads} />
      )}
    </div>
  );
}
