'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lead, LeadStage } from '@/types/lead';
import { LEAD_STATUS_TO_STAGE } from '@/types/lead';
import { cn } from '@/lib/utils/helpers';
import { useLocale } from '@/lib/i18n/LocaleContext';

const STAGE_KEYS: { id: LeadStage; key: string }[] = [
  { id: 'new', key: 'agent.kanban.new' },
  { id: 'contacted', key: 'agent.kanban.contacted' },
  { id: 'visit_scheduled', key: 'agent.kanban.visitScheduled' },
  { id: 'proposal_sent', key: 'agent.kanban.proposalSent' },
  { id: 'closed_won', key: 'agent.kanban.closedWon' },
  { id: 'closed_lost', key: 'agent.kanban.closedLost' },
];

interface PipelineKanbanProps {
  leads: Lead[];
  onLeadUpdate?: (lead: Lead) => void;
  onLeadClick?: (lead: Lead) => void;
  onStatusChange?: (lead: Lead, newStage: LeadStage) => void;
}

function LeadCard({
  lead,
  stageId,
  onClick,
  isDragging,
  onDragStart: notifyDragStart,
  onDragEnd: notifyDragEnd,
}: {
  lead: Lead;
  stageId: LeadStage;
  onClick?: () => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  return (
    <motion.div
      layout
      draggable
      onDragStart={(e: any) => {
        e.dataTransfer?.setData('application/json', JSON.stringify({ leadId: lead.id, stageId }));
        if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
        notifyDragStart?.();
      }}
      onDragEnd={notifyDragEnd}
      className={cn(
        'cursor-grab rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow active:cursor-grabbing dark:border-gray-600 dark:bg-gray-800',
        isDragging && 'opacity-50'
      )}
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
  onStatusChange,
}: PipelineKanbanProps) {
  const { t } = useLocale();
  const [draggedLeadId, setDraggedLeadId] = useState<string | number | null>(null);
  const stages = STAGE_KEYS.map(({ id, key }) => ({ id, label: t(key) }));

  const leadsByStage = stages.reduce<Record<LeadStage, Lead[]>>(
    (acc, { id }) => {
      acc[id] = leads.filter((l) => LEAD_STATUS_TO_STAGE[l.status] === id);
      return acc;
    },
    {} as Record<LeadStage, Lead[]>
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStageId: LeadStage) => {
    e.preventDefault();
    setDraggedLeadId(null);
    try {
      const json = e.dataTransfer.getData('application/json');
      const { leadId, stageId: fromStageId } = JSON.parse(json) as { leadId: string | number; stageId: LeadStage };
      if (fromStageId === targetStageId) return;
      const lead = leads.find((l) => l.id === leadId);
      if (lead && onStatusChange) onStatusChange(lead, targetStageId);
    } catch {
      // ignore invalid drop data
    }
  };

  const handleDragStart = (leadId: string | number) => setDraggedLeadId(leadId);
  const handleDragEnd = () => setDraggedLeadId(null);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map(({ id, label }) => (
        <div
          key={id}
          className="min-w-[280px] flex-1 rounded-xl border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, id)}
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
                stageId={id}
                onClick={() => onLeadClick?.(lead)}
                isDragging={draggedLeadId === lead.id}
                onDragStart={() => handleDragStart(lead.id)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
