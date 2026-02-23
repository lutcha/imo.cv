'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  Squares2X2Icon,
  DocumentArrowDownIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils/helpers';

// Mock data – substituir por API quando existir
const PERIODS = ['12 Months', 'YTD', '5 Years'] as const;
const DISTRICTS = [
  { name: 'Plateau', avgPrice: '€1,850/m²', trend: 8.2, trendUp: true, absorption: '18.4%' },
  { name: 'Palmarejo', avgPrice: '€1,420/m²', trend: 3.1, trendUp: true, absorption: '14.2%' },
  { name: 'Achada Sto Antonio', avgPrice: '€1,100/m²', trend: 1.2, trendUp: false, absorption: '9.8%' },
  { name: 'Cidadela', avgPrice: '€2,100/m²', trend: 5.4, trendUp: true, absorption: '22.1%' },
];

const HEATMAP_CELLS = [
  'low', 'med', 'high', 'med', 'high', 'high', 'med', 'low',
  'med', 'high', 'high', 'high', 'high', 'high', 'high', 'med',
  'high', 'high', 'high', 'high', 'med', 'low', 'low', 'low',
  'low', 'med', 'high', 'high', 'high', 'high', 'high', 'med',
];

export default function MarketIntelligencePage() {
  const [period, setPeriod] = useState<typeof PERIODS[number]>('12 Months');
  const [island] = useState('Santiago Island');

  return (
    <div className="space-y-6">
      {/* Header: island + last updated + export */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-800">
            <span className="text-sm font-semibold text-imo-primary dark:text-primary-blue-400">{island}</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Última atualização: Hoje
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Squares2X2Icon className="h-5 w-5" />
            Exportar Excel
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-blue-700 dark:bg-primary-blue-500 dark:hover:bg-primary-blue-600"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            Exportar PDF
          </button>
        </div>
      </header>

      {/* Title + period selector */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Market Intelligence
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Análise demográfica e transaccional em tempo real para a região de Santiago.
          </p>
        </div>
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                period === p
                  ? 'bg-primary-blue-100 text-primary-blue-600 dark:bg-primary-blue-900/30 dark:text-primary-blue-400'
                  : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Ribbon – reutiliza KpiCard com trend */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Preço médio por m²"
          value="€1.240"
          trend="up"
          trendValue={4.5}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
        <KpiCard
          title="Preço mediano de listagem"
          value="€145.000"
          trend="down"
          trendValue={2.1}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
        <KpiCard
          title="Inventário"
          value="842 unidades"
          trend="up"
          trendValue={12}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
        <KpiCard
          title="Taxa de absorção"
          value="12,4%"
          trend="up"
          trendValue={1.2}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Price evolution (line chart placeholder) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Evolução de preços</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Benchmark: Santiago vs média nacional</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-blue-500" /> Santiago
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400" /> Nacional
              </span>
            </div>
          </div>
          <div className="relative h-64 w-full">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 100">
              <path
                d="M0,80 Q50,70 100,75 T200,45 T300,55 T400,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary-blue-500"
              />
              <path
                d="M0,85 Q50,82 100,88 T200,70 T300,75 T400,60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4"
                className="text-gray-400"
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-bold text-gray-400">
            <span>JAN</span><span>MAR</span><span>MAI</span><span>JUL</span><span>SET</span><span>NOV</span><span>DEZ</span>
          </div>
        </div>

        {/* Property types pie */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tipos de imóvel</h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Distribuição do inventário</p>
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-gray-300 dark:text-gray-600" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeDasharray="65 100" strokeLinecap="round" strokeWidth="4" className="text-primary-blue-500" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeDasharray="25 100" strokeDashoffset="-65" strokeLinecap="round" strokeWidth="4" className="text-hope-green-500" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeDasharray="10 100" strokeDashoffset="-90" strokeLinecap="round" strokeWidth="4" className="text-gray-500" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">842</span>
              <span className="text-[10px] font-bold text-gray-500">TOTAL</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-primary-blue-500" /> Apartamentos
              </span>
              <span className="font-bold">65%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-hope-green-500" /> Moradias/Villas
              </span>
              <span className="font-bold">25%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-gray-500" /> Terrenos/Outros
              </span>
              <span className="font-bold">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap + Districts table */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price density heatmap */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mapa de densidade de preços</h3>
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold text-primary-blue-600 hover:underline dark:text-primary-blue-400"
            >
              Abrir mapa interativo <MapIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-8 gap-1 overflow-hidden rounded-lg border border-gray-200 aspect-video dark:border-gray-600">
            {HEATMAP_CELLS.map((level, i) => (
              <div
                key={i}
                className={cn(
                  'min-h-[12px]',
                  level === 'high' && 'bg-primary-blue-600/90',
                  level === 'med' && 'bg-primary-blue-500/50',
                  level === 'low' && 'bg-primary-blue-500/20'
                )}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase text-gray-500">
            <span>Baixo interesse</span>
            <div className="mx-4 h-2 flex-1 rounded-full bg-gradient-to-r from-primary-blue-200 to-primary-blue-600" />
            <span>Alto volume</span>
          </div>
        </div>

        {/* Top districts table */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Distritos com melhor desempenho</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-gray-600 dark:text-gray-400">
                  <th className="py-3">Bairro</th>
                  <th className="py-3">Preço médio</th>
                  <th className="py-3">Tendência MoM</th>
                  <th className="py-3 text-right">Absorção</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {DISTRICTS.map((row) => (
                  <tr key={row.name} className="border-b border-gray-100 last:border-0 dark:border-gray-700/50">
                    <td className="py-4 font-bold text-gray-900 dark:text-white">{row.name}</td>
                    <td className="py-4 text-gray-700 dark:text-gray-300">{row.avgPrice}</td>
                    <td className="py-4">
                      <span className={row.trendUp ? 'text-hope-green-600 dark:text-hope-green-400' : 'text-danger'}>
                        {row.trendUp ? '+' : '-'}{row.trend}%
                      </span>
                    </td>
                    <td className="py-4 text-right text-gray-700 dark:text-gray-300">{row.absorption}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer meta */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} imo.cv. Dados incluem registos municipais e transacções internas do CRM.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary-blue-600 hover:underline dark:hover:text-primary-blue-400">
            Termos de uso de dados
          </a>
          <a href="#" className="hover:text-primary-blue-600 hover:underline dark:hover:text-primary-blue-400">
            Documentação API
          </a>
        </div>
      </footer>
    </div>
  );
}
