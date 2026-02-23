import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Intelligence | imo.cv',
  description:
    'Dados e insights exclusivos do mercado imobiliário de Cabo Verde. Índice de preços, heatmaps de demanda e relatórios para investidores.',
};

const solutions = [
  {
    icon: '📊',
    title: 'Análise de ROI',
    desc: 'Calcula o potencial de retorno dos teus projectos com precisão matemática. Comparativo por ilha e tipologia.',
  },
  {
    icon: '🗺️',
    title: 'Índice de Preços por Ilha',
    desc: 'Acesso a dados comparativos de todas as ilhas. Preço médio por m², evolução histórica e previsões.',
  },
  {
    icon: '📈',
    title: 'Tendências de Procura',
    desc: 'Entende o que compradores nacionais e internacionais procuram. Filtros por nacionalidade, orçamento e tipologia.',
  },
];

const marketStats = [
  { label: 'Preço médio/m² Praia', value: '145.000', unit: 'CVE', trend: '+12.4%' },
  { label: 'Yield médio', value: '8.2', unit: '%', trend: '12 meses' },
  { label: 'Transações analisadas', value: '+5.000', unit: '', trend: 'por mês' },
];

const plans = [
  {
    name: 'Essential',
    price: '10.000',
    desc: 'Para investidores individuais.',
    features: ['Dashboard de preços', 'Heatmaps básicos', '1 relatório mensal em PDF', 'Dados por ilha', 'Suporte por email'],
    cta: 'Começar agora',
    featured: false,
  },
  {
    name: 'Professional',
    price: '25.000',
    desc: 'Para promotores e grandes imobiliárias.',
    features: [
      'Tudo no Essential',
      'Acesso completo à API',
      'Relatórios personalizados ilimitados',
      'Suporte prioritário 24/7',
      'Sessões de análise mensais',
      'Dados históricos 5+ anos',
    ],
    cta: 'Aderir ao Professional',
    featured: true,
  },
];

export default function MarketIntelligenceSolucaoPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #1e3b8a 0%, #0a1e4a 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                Dados Oficiais e Actualizados
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
                Decisões Inteligentes
                <br />
                <span className="text-white/80">baseadas em Dados Reais</span>
              </h1>
              <p className="mt-5 text-lg text-white/70">
                Reduz o risco e maximiza o retorno do teu investimento imobiliário
                com dados exclusivos do mercado cabo-verdiano.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/agente/market-intelligence"
                  className="inline-flex items-center rounded-xl bg-[#f59e0b] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                >
                  Aceder aos dados agora
                </Link>
                <Link
                  href="#precos"
                  className="inline-flex items-center rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Ver planos
                </Link>
              </div>
            </div>

            {/* Right: live market mockup */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f59e0b] animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Dados ao vivo
                  </span>
                </div>
                <span className="text-xs text-white/30">Actualizado há 2min</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {marketStats.slice(0, 2).map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/10 p-3">
                    <p className="text-[10px] text-white/40">{s.label}</p>
                    <p className="mt-1 text-xl font-black text-white">
                      {s.value}
                      <span className="text-xs font-normal text-white/50"> {s.unit}</span>
                    </p>
                    <p className="text-xs font-semibold text-[#f59e0b]">{s.trend}</p>
                  </div>
                ))}
              </div>

              {/* Mini heatmap */}
              <div className="mt-4 rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-[10px] text-white/40">Heatmap de preços — Santiago</p>
                <div className="grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 32 }, (_, i) => {
                    const intensity = [0.3, 0.5, 0.8, 1, 0.9, 0.6, 0.4, 0.2][i % 8] *
                      [0.5, 0.7, 1, 0.8][Math.floor(i / 8) % 4];
                    return (
                      <div
                        key={i}
                        className="h-4 rounded-sm"
                        style={{
                          backgroundColor: `rgba(245, 158, 11, ${Math.min(intensity, 1)})`,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-[9px] text-white/30">Baixo</span>
                  <span className="text-[9px] text-white/30">Alto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Soluções estratégicas para investidores
          </h2>
          <p className="mt-3 text-gray-500">
            Transformamos dados complexos em insights accionáveis para o mercado cabo-verdiano.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-bold text-gray-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data preview / heatmap section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1e3b8a' }}>
                Dados reais
              </span>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                Visualiza a força dos nossos dados
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                A nossa tecnologia processa milhares de transações e listagens diariamente,
                gerando insights que não encontras em nenhum outro lugar em Cabo Verde.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Mapas de calor de densidade de preços',
                  'Séries temporais de valorização (24+ meses)',
                  'Filtros avançados por tipologia e bairro',
                  'Exportação para Excel/PDF',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircleIcon className="h-4 w-4 shrink-0 text-[#1e3b8a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Price evolution bars */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <p className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
                Valorização de Propriedades (12 Meses)
              </p>
              <div className="space-y-2">
                {[
                  { island: 'Santiago', pct: 85, color: '#1e3b8a' },
                  { island: 'Sal', pct: 72, color: '#005baa' },
                  { island: 'Boa Vista', pct: 63, color: '#f59e0b' },
                  { island: 'São Vicente', pct: 48, color: '#008542' },
                ].map((bar) => (
                  <div key={bar.island}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-gray-700 dark:text-gray-300">{bar.island}</span>
                      <span className="font-bold" style={{ color: bar.color }}>
                        +{Math.round(bar.pct * 0.18)}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16" style={{ backgroundColor: '#1e3b8a' }}>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Fonte de Dados Verificada
          </span>
          <blockquote className="mt-6">
            <p className="text-lg font-medium italic text-white/90">
              &ldquo;O imo.cv Market Intelligence mudou completamente a forma como avaliamos
              novos terrenos. Economizámos meses de pesquisa e investimos com muito mais
              confiança.&rdquo;
            </p>
            <footer className="mt-6 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f59e0b] text-sm font-bold text-white">
                CS
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Eng. Carlos Silva</p>
                <p className="text-sm text-white/60">CEO, Cabo Verde Developers Group</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">Planos de Acesso</h2>
            <p className="mt-3 text-gray-500">Escolhe a profundidade de dados que o teu negócio exige.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-950 ${
                  plan.featured ? 'border-2 ring-2 ring-[#f59e0b]/20' : 'border border-gray-200 dark:border-gray-800'
                }`}
                style={plan.featured ? { borderColor: '#f59e0b' } : {}}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#f59e0b] px-4 py-1 text-xs font-bold text-white shadow">
                      Mais Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.desc}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="mb-1 text-sm text-gray-500">CVE/mês</span>
                  </div>
                </div>
                <ul className="my-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircleIcon className="h-4 w-4 shrink-0 text-[#1e3b8a]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/agente/login"
                  className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: plan.featured ? '#f59e0b' : '#1e3b8a' }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-4 py-16 text-center"
        style={{ background: 'linear-gradient(135deg, #1e3b8a 0%, #0a1e4a 100%)' }}
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Pronto para liderar o mercado?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Não deixes o teu investimento ao acaso. Usa a inteligência a teu favor.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/agente/market-intelligence"
            className="rounded-xl bg-[#f59e0b] px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
          >
            Aceder aos dados agora
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border-2 border-white/30 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Agendar demonstração
          </Link>
        </div>
      </section>
    </div>
  );
}
