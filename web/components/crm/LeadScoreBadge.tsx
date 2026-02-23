'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/helpers';

interface LeadScoreBadgeProps {
    score: number;
    className?: string;
}

export function LeadScoreBadge({ score, className }: LeadScoreBadgeProps) {
    const config = useMemo(() => {
        if (score >= 80) {
            return {
                label: 'Alta Prioridade',
                bgColor: 'bg-hope-green-500',
                textColor: 'text-white',
                shadow: 'shadow-hope-green-500/20'
            };
        }
        if (score >= 60) {
            return {
                label: 'Média Prioridade',
                bgColor: 'bg-dream-gold-500',
                textColor: 'text-white',
                shadow: 'shadow-dream-gold-500/20'
            };
        }
        return {
            label: 'Baixa Prioridade',
            bgColor: 'bg-danger',
            textColor: 'text-white',
            shadow: 'shadow-danger/20'
        };
    }, [score]);

    return (
        <div className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm transition-all",
            config.bgColor,
            config.textColor,
            config.shadow,
            className
        )}>
            {score}% - {config.label}
        </div>
    );
}
