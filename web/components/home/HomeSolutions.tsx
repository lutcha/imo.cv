'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type Plan = { name: string; price: string; note?: string; features: string[] };

type Solution = {
  id: string;
  icon: string; // emoji icon
  accentBg: string;
  accentText: string;
  borderColor: string;
  featured?: boolean;
  badge?: string;
  title: string;
  description: string;
  features: string[];
  plans: Plan[];
  href: string;
};

const solutions: Solution[] = [
  {
    id: 'crm',
    icon: '🏢',
    accentBg: '#005baa',
    accentText: '#ffffff',
    borderColor: '#c5d8f0',
    title: 'CRM para Agências',
    description:
      'Plataforma completa para gestão de imóveis, leads e clientes. Aumenta a tua taxa de conversão com um funil de vendas visual.',
    features: [
      'Dashboard de desempenho em tempo real',
      'Funil de vendas Kanban',
      'Gestão de leads por WhatsApp',
      'Relatórios de conversão',
    ],
    plans: [
      { name: 'Starter', price: '4.500', features: ['5 imóveis', 'CRM básico', '3 utilizadores'] },
      { name: 'Pro', price: '9.000', features: ['Ilimitado', 'Analytics avançado', 'Pipeline completo'] },
    ],
    href: '/solucoes/crm',
  },
  {
    id: 'condominios',
    icon: '🏘️',
    accentBg: '#008542',
    accentText: '#ffffff',
    borderColor: '#ec7f13',
    featured: true,
    badge: 'Mais Popular',
    title: 'Gestão de Condomínios',
    description:
      'Sistema completo para administradores de condomínios. Simplifica cobranças, comunicação e assembleias.',
    features: [
      'Pagamento de quotas online',
      'Reserva de áreas comuns',
      'Relatórios financeiros',
      'Votação digital em assembleias',
    ],
    plans: [
      { name: 'Básico', price: '500', note: '/unidade/mês', features: ['Gestão de unidades', 'Emissão de faturas', 'Comunicação centralizada'] },
      { name: 'Premium', price: '800', note: '/unidade/mês', features: ['Tudo no Básico', 'Relatórios financeiros', 'Sistema de votação'] },
    ],
    href: '/solucoes/condominios',
  },
  {
    id: 'market-intelligence',
    icon: '📊',
    accentBg: '#1e3b8a',
    accentText: '#ffffff',
    borderColor: '#9dbde6',
    title: 'Market Intelligence',
    description:
      'Dados e insights exclusivos do mercado imobiliário de Cabo Verde. Toma decisões de investimento informadas.',
    features: [
      'Índice de preços por ilha',
      'Heatmaps de demanda',
      'Relatórios trimestrais',
      'Tendências de mercado',
    ],
    plans: [
      { name: 'Essential', price: '10.000', features: ['Acesso básico', '1 relatório/mês', 'Dados por ilha'] },
      { name: 'Professional', price: '25.000', features: ['Acesso completo', 'Relatórios custom', 'API de dados'] },
    ],
    href: '/solucoes/market-intelligence',
  },
];

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-gray-900 ${
        solution.featured
          ? 'scale-105 border-2 ring-2 ring-[#ec7f13]/20'
          : 'border border-gray-200 dark:border-gray-800'
      }`}
      style={solution.featured ? { borderColor: '#ec7f13' } : { borderColor: solution.borderColor }}
    >
      {/* Featured badge */}
      {solution.featured && solution.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full px-4 py-1 text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: '#ec7f13' }}>
            {solution.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="rounded-t-2xl p-6" style={{ backgroundColor: solution.accentBg + '12' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-sm"
            style={{ backgroundColor: solution.accentBg }}
          >
            {solution.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{solution.title}</h3>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{solution.description}</p>
      </div>

      {/* Features */}
      <div className="px-6 py-4">
        <ul className="space-y-2">
          {solution.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#008542]" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="mt-auto border-t border-gray-100 px-6 py-4 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-3">
          {solution.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`rounded-xl p-3 text-center ${
                i === 1 ? 'border bg-gray-50 dark:bg-gray-800' : 'bg-gray-50/60 dark:bg-gray-800/60'
              }`}
              style={i === 1 ? { borderColor: solution.accentBg + '40' } : {}}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{plan.name}</p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                {plan.price} <span className="text-xs font-normal text-gray-500">CVE</span>
              </p>
              {plan.note && <p className="text-[10px] text-gray-500">{plan.note}</p>}
              <ul className="mt-2 space-y-0.5">
                {plan.features.map((f) => (
                  <li key={f} className="text-[11px] text-gray-500 dark:text-gray-400">{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href={solution.href}
          className="mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: solution.accentBg }}
        >
          Saber mais →
        </Link>
      </div>
    </div>
  );
}

export function HomeSolutions() {
  return (
    <section className="border-b border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: '#ec7f13' }}
          >
            Plataforma B2B
          </span>
          <h2 className="mt-3 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Soluções para cada necessidade
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Ferramentas desenhadas especificamente para o contexto cabo-verdiano — para
            agências, administradores e investidores.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <SolutionCard key={s.id} solution={s} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Todos os planos incluem suporte em português. Sem custos de implementação.
        </p>
      </div>
    </section>
  );
}
