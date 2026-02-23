'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeadScoreBadge } from './LeadScoreBadge';
import { Button } from '@/components/ui/Button';
import {
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    EllipsisVerticalIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';

interface Lead {
    id: string;
    name: string;
    property: string;
    value: number;
    score: number;
    tags: string[];
}

interface Column {
    id: string;
    name: string;
    color: string;
    leads: Lead[];
}

const INITIAL_COLUMNS: Column[] = [
    {
        id: 'novo',
        name: 'Novos Leads',
        color: 'bg-trust-blue-500',
        leads: [
            { id: '1', name: 'João Silva', property: 'Apartamento T3 Palmarejo', value: 12500000, score: 85, tags: ['WhatsApp', 'Diáspora'] },
            { id: '2', name: 'Maria Santos', property: 'Vivenda T4 Sal Rei', value: 25000000, score: 62, tags: ['Crédito'] },
        ]
    },
    {
        id: 'contactado',
        name: 'Contactados',
        color: 'bg-purple-500',
        leads: [
            { id: '3', name: 'António Lopes', property: 'Apartamento T2 Achada', value: 8500000, score: 45, tags: ['Investidor'] },
        ]
    },
    {
        id: 'visita',
        name: 'Visita Agendada',
        color: 'bg-pink-500',
        leads: []
    },
    {
        id: 'proposta',
        name: 'Proposta Enviada',
        color: 'bg-dream-gold-500',
        leads: [
            { id: '4', name: 'Sara Costa', property: 'Penthouse Santa Maria', value: 45000000, score: 92, tags: ['Prioridade'] },
        ]
    },
    {
        id: 'fechado',
        name: 'Fechado',
        color: 'bg-hope-green-500',
        leads: []
    }
];

export function KanbanPipeline() {
    const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);

    return (
        <div className="flex h-[calc(100vh-120px)] w-full gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="flex min-w-[320px] flex-col rounded-2xl bg-gray-100/50 p-3 dark:bg-gray-800/30"
                >
                    {/* Column Header */}
                    <div className="mb-4 flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <div className={cn("h-3 w-3 rounded-full", column.color)} />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {column.name}
                            </h3>
                            <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                {column.leads.length}
                            </span>
                        </div>
                        <button className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5">
                            <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Quick Add Button */}
                    <button className="mb-4 flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-2 text-gray-400 transition-colors hover:border-trust-blue-500 hover:text-trust-blue-500 dark:border-gray-700">
                        <PlusIcon className="h-5 w-5" />
                    </button>

                    {/* Leads List */}
                    <div className="flex-1 space-y-3 overflow-y-auto">
                        <AnimatePresence>
                            {column.leads.map((lead) => (
                                <LeadCard key={lead.id} lead={lead} />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            ))}
        </div>
    );
}

function LeadCard({ lead }: { lead: Lead }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative cursor-grab rounded-xl border border-white/20 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700/50 dark:bg-gray-900 active:cursor-grabbing"
        >
            <div className="flex items-start justify-between">
                <LeadScoreBadge score={lead.score} />
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="mt-3">
                <h4 className="font-bold text-gray-900 dark:text-white">{lead.name}</h4>
                <p className="mt-1 text-xs text-gray-500">{lead.property}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1">
                {lead.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3 dark:border-gray-800">
                <div className="text-sm font-bold text-trust-blue-600">
                    {new Intl.NumberFormat('pt-CV').format(lead.value)} CVE
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg bg-hope-green-50 p-1.5 text-hope-green-600 hover:bg-hope-green-100 dark:bg-hope-green-900/30">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg bg-trust-blue-50 p-1.5 text-trust-blue-600 hover:bg-trust-blue-100 dark:bg-trust-blue-900/30">
                        <PhoneIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
