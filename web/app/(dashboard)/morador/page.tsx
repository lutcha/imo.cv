'use client';

import {
  BellIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

const ANNOUNCEMENTS = [
  {
    id: 1,
    icon: WrenchScrewdriverIcon,
    title: 'Manutenção do…',
    detail: 'O elevador social estará em manutenção preventiva das 14h…',
    when: 'Hoje',
    color: '#005baa',
  },
  {
    id: 2,
    icon: UserGroupIcon,
    title: 'Próxima Assembleia',
    detail: 'Convocação oficial para a assembleia extraordinária no dia…',
    when: '2 dias',
    color: '#ec7f13',
  },
  {
    id: 3,
    icon: SparklesIcon,
    title: 'Dedetização Áreas…',
    detail: 'Informamos que as áreas externas passarão por dedetização no…',
    when: '5 dias',
    color: '#008542',
  },
];

const CHART_DATA = [
  { month: 'MAI', water: 60, energy: 70 },
  { month: 'JUN', water: 55, energy: 65 },
  { month: 'JUL', water: 70, energy: 80 },
  { month: 'AGO', water: 65, energy: 75 },
  { month: 'SET', water: 58, energy: 68 },
  { month: 'OUT', water: 45, energy: 55 },
];

const FACILITIES = [
  { label: 'Churrasqueira', emoji: '🔥' },
  { label: 'Salão de Festas', emoji: '🎉' },
  { label: 'Quadra', emoji: '🏀' },
  { label: 'Portaria 24h', emoji: '🔐' },
];

export default function MoradorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Bem-vindo, Residente</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <BellIcon className="h-5 w-5 text-gray-500" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#008542' }}>
              JS
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">João Silva</span>
          </div>
        </div>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Current fee card */}
        <div className="col-span-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Month placeholder */}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-xs font-bold text-gray-400 dark:border-gray-600">
                MÊS/<br/>OUT
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Saldo Atual</p>
              <p className="mt-1 text-4xl font-black text-gray-900 dark:text-white">
                450,00 <span className="text-2xl">CV</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Taxa Condominial referente ao mês de Outubro.<br />
                Vencimento em: 10/10/2023
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                  style={{ backgroundColor: '#005baa' }}
                >
                  💳 Pagar Agora
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Status card */}
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                PENDENTE
              </span>
            </div>
          </div>
        </div>

        {/* Status general */}
        <div className="rounded-2xl border p-5 dark:border-gray-700" style={{ borderColor: '#00854230', backgroundColor: '#00854208' }}>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: '#00854220' }}>
              <CheckCircleSolid className="h-5 w-5" style={{ color: '#008542' }} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#008542' }}>
              Status Geral
            </span>
          </div>
          <h3 className="mt-2 text-base font-black text-gray-900 dark:text-white">
            Você está em dia com o condomínio.
          </h3>
          <p className="mt-2 text-xs text-gray-500">
            Nenhuma pendência anterior encontrada em sua unidade.
          </p>
          <button
            type="button"
            className="mt-4 text-xs font-bold hover:underline"
            style={{ color: '#008542' }}
          >
            Ver histórico financeiro →
          </button>
        </div>
      </div>

      {/* Comunicados + Consumption chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Comunicados */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900 dark:text-white">Comunicados</h2>
            <button
              type="button"
              className="text-xs font-bold hover:underline"
              style={{ color: '#005baa' }}
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {ANNOUNCEMENTS.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.id} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-700">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${a.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{a.title}</p>
                      <span className="shrink-0 text-xs text-gray-400">{a.when}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{a.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consumption chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900 dark:text-white">Gráfico de Consumo</h2>
            <div className="flex gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5" style={{ color: '#005baa' }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#005baa' }} />
                Água
              </span>
              <span className="flex items-center gap-1.5 text-amber-500">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Energia
              </span>
            </div>
          </div>

          {/* CSS bar chart */}
          <div className="flex items-end justify-between gap-1 h-36">
            {CHART_DATA.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="flex w-full flex-col items-center gap-0.5">
                  <div
                    className="w-full rounded-t-sm"
                    style={{ height: `${d.water * 0.9}px`, backgroundColor: '#005baa', opacity: 0.8 }}
                  />
                  <div
                    className="w-full rounded-t-sm"
                    style={{ height: `${d.energy * 0.5}px`, backgroundColor: '#f59e0b', opacity: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {CHART_DATA.map((d) => (
              <span key={d.month} className="flex-1 text-center text-[9px] font-bold text-gray-400">
                {d.month}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Consumo médio (6 meses)</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">68.4 m³</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Meta de Economia</p>
              <p className="text-lg font-black text-green-600">-12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities quick access */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FACILITIES.map((f) => (
          <button
            key={f.label}
            type="button"
            className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#008542] hover:shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="text-3xl">{f.emoji}</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
