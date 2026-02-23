import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CalculatorIcon,
  ChartBarIcon,
  HomeModernIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Simuladores Imobiliários – imo.cv',
  description:
    'Ferramentas gratuitas para calcular o teu crédito habitação, rendimento de investimento e estimativas de arrendamento em Cabo Verde.',
};

const SIMULATORS = [
  {
    href: '/simuladores/credito',
    icon: CalculatorIcon,
    color: '#005baa',
    bg: '#005baa12',
    badge: 'Disponível',
    badgeColor: '#008542',
    title: 'Simulador de Crédito Habitação',
    desc: 'Calcula a tua prestação mensal, valor de crédito, juros totais e custos de compra. Adapta taxa, prazo e poupanças ao teu perfil.',
    highlights: ['Prestação mensal', 'Juros totais', 'Tabela de amortização', 'Pedido de pré-aprovação'],
  },
  {
    href: '#',
    icon: ChartBarIcon,
    color: '#ec7f13',
    bg: '#ec7f1312',
    badge: 'Em breve',
    badgeColor: '#9ca3af',
    title: 'Simulador de ROI de Investimento',
    desc: 'Estima o retorno anual do teu investimento imobiliário. Yield bruto, líquido, período de retorno e comparativo por ilha.',
    highlights: ['Yield bruto / líquido', 'Período de retorno', 'Comparativo por ilha', 'Exportar relatório'],
  },
  {
    href: '#',
    icon: HomeModernIcon,
    color: '#008542',
    bg: '#00854212',
    badge: 'Em breve',
    badgeColor: '#9ca3af',
    title: 'Simulador de Arrendamento',
    desc: 'Compara preços de arrendamento por zona, estima rendimento mensal e calcula a rentabilidade do teu imóvel como alojamento local.',
    highlights: ['Preço justo de mercado', 'Rendimento mensal', 'Alojamento local vs longa duração', 'Custos e despesas'],
  },
];

export default function SimuladoresPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: 'linear-gradient(135deg, #005baa 0%, #008542 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            <CalculatorIcon className="h-4 w-4" />
            Ferramentas Gratuitas
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Simuladores Imobiliários
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Toma decisões informadas com as nossas ferramentas de simulação.
            Crédito habitação, ROI de investimento e estimativas de arrendamento — tudo gratuito.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {SIMULATORS.map((sim) => {
            const Icon = sim.icon;
            const isAvailable = sim.badge === 'Disponível';
            const Wrapper = isAvailable ? Link : 'div';
            return (
              <Wrapper
                key={sim.title}
                href={sim.href as string}
                className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 ${
                  isAvailable ? 'hover:shadow-md hover:-translate-y-0.5' : 'opacity-70'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: sim.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: sim.color }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: sim.badgeColor }}
                  >
                    {sim.badge}
                  </span>
                </div>

                <h2 className="text-base font-black text-gray-900 dark:text-white">
                  {sim.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {sim.desc}
                </p>

                <ul className="my-4 space-y-1.5">
                  {sim.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: sim.color }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {isAvailable ? (
                  <div
                    className="mt-auto flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                    style={{ backgroundColor: sim.color }}
                  >
                    Abrir simulador
                    <ArrowRightIcon className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="mt-auto rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-400 dark:border-gray-600">
                    Em breve
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>

        {/* Info note */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Nota:</strong> Os valores calculados são estimativas indicativas. As condições reais de crédito
            dependem da avaliação individual de cada banco parceiro em Cabo Verde. Consulta um intermediário
            de crédito para uma proposta personalizada.
          </p>
        </div>
      </div>
    </div>
  );
}
