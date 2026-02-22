'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lead, LeadStage } from '@/types/lead';
import { LEAD_STATUS_TO_STAGE } from '@/types/lead';
import { cn } from '@/lib/utils/helpers';

const STAGES: { id: LeadStage; label: string }[] = [
  { id: 'new', label: 'Novos' },
  { id: 'contacted', label: 'Contactados' },
  { id: 'visit_scheduled', label: 'Visita agendada' },
  { id: 'proposal_sent', label: 'Proposta enviada' },
  { id: 'closed_won', label: 'Ganhos' },
  { id: 'closed_lost', label: 'Perdidos' },
];

interface PipelineKanbanProps {
  leads: Lead[];
  onLeadUpdate?: (lead: Lead) => void;
  onLeadClick?: (lead: Lead) => void;
}

function LeadCard({
  lead,
  onClick,
}: {
  lead: Lead;
  onClick?: () => void;
}) {
  return (
    <motion.div
      layout
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow dark:border-gray-600 dark:bg-gray-800"
      onClick={onClick}
      whileHover={{ y: -2 }}
    >
      <p className="font-medium text-gray-900 dark:text-white">{lead.full_name}</p>
      {lead.email && (
        <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">
          {lead.email}
        </p>
      )}
      {lead.phone && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{lead.phone}</p>
      )}
      {lead.priority && (
        <span
          className={cn(
            'mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium',
            lead.priority === 'ALTA' && 'bg-danger/20 text-danger',
            lead.priority === 'MEDIA' && 'bg-warning/20 text-warning',
            lead.priority === 'BAIXA' && 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          )}
        >
          {lead.priority}
        </span>
      )}
    </motion.div>
  );
}

export function PipelineKanban({
  leads,
  onLeadUpdate,
  onLeadClick,
}: PipelineKanbanProps) {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const leadsByStage = STAGES.reduce<Record<LeadStage, Lead[]>>(
    (acc, { id }) => {
      acc[id] = leads.filter((l) => LEAD_STATUS_TO_STAGE[l.status] === id);
      return acc;
    },
    {} as Record<LeadStage, Lead[]>
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STAGES.map(({ id, label }) => (
        <div
          key={id}
          className="min-w-[280px] flex-1 rounded-xl border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {label}
            </h3>
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm font-medium dark:bg-gray-600">
              {leadsByStage[id]?.length ?? 0}
            </span>
          </div>
          <div className="space-y-2 p-3">
            {(leadsByStage[id] ?? []).map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onClick={() => onLeadClick?.(lead)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
