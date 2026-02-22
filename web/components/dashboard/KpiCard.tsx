'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/helpers';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  icon: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const trendColors = {
  up: 'text-success dark:text-primary-green-400',
  down: 'text-danger',
  neutral: 'text-gray-500 dark:text-gray-400',
};

export function KpiCard({
  title,
  value,
  trend,
  trendValue,
  icon,
  subtitle,
  className,
}: KpiCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend != null && trendValue != null && (
            <p className={cn('mt-1 text-sm font-medium', trendColors[trend])}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'neutral' && '→'} {Math.abs(trendValue)}%
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                vs mês anterior
              </span>
            </p>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary-blue-100 p-3 dark:bg-primary-blue-900/30">
          <div className="text-primary-blue-600 dark:text-primary-blue-400">
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
