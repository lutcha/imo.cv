import type { Metadata } from 'next';
import Link from 'next/link';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import CreditSimulatorClient from '@/components/finance/CreditSimulatorClient';

export const metadata: Metadata = {
  title: 'Simulador de Crédito Habitação – imo.cv',
  description:
    'Calcula a tua prestação mensal de crédito habitação em Cabo Verde. Simula valores, taxas, prazo e custos de compra gratuitamente.',
};

export default function CreditoSimuladorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Compact hero / breadcrumb */}
      <section
        className="relative overflow-hidden py-10 sm:py-14"
        style={{ background: 'linear-gradient(135deg, #005baa 0%, #003572 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link href="/simuladores" className="hover:text-white transition-colors">Simuladores</Link>
            <span>/</span>
            <span className="text-white">Crédito Habitação</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <CalculatorIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Simulador de Crédito Habitação
              </h1>
              <p className="mt-2 text-white/70">
                Estima a tua prestação mensal, juros totais e custos de aquisição — gratuitamente.
              </p>
            </div>
          </div>

          {/* Key highlights */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'Prestação mensal',
              'Tabela de amortização',
              'Custos de compra incluídos',
              'Pedido de pré-aprovação',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator — client component (browser-only sliders) */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <CreditSimulatorClient />
      </div>

      {/* Disclaimer + nav */}
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-900/30 dark:bg-amber-900/10">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>Aviso legal:</strong> Os resultados desta simulação são meramente indicativos e não constituem
            uma proposta vinculativa de crédito. As condições finais dependem da avaliação do perfil de risco,
            rendimentos e política de cada instituição financeira em Cabo Verde.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/simuladores"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#005baa] hover:text-[#005baa] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            ← Todos os simuladores
          </Link>
          <Link
            href="/search?listing_type=sale"
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: '#005baa' }}
          >
            Ver imóveis à venda
          </Link>
        </div>
      </div>
    </div>
  );
}
